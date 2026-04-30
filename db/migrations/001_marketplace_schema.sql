BEGIN;

-- Shared timestamp trigger for mutable rows.
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Enumerations
CREATE TYPE user_role AS ENUM ('advisor', 'client', 'admin');
CREATE TYPE profile_status AS ENUM ('draft', 'published', 'suspended');
CREATE TYPE booking_status AS ENUM (
  'draft',
  'slot_held',
  'payment_pending',
  'confirmed',
  'awaiting_consent',
  'ready_to_join',
  'in_session',
  'completed',
  'cancelled_by_client',
  'cancelled_by_advisor',
  'no_show',
  'refund_pending',
  'refunded',
  'disputed',
  'dispute_resolved'
);
CREATE TYPE consent_party AS ENUM ('advisor', 'client');
CREATE TYPE consent_status AS ENUM ('pending', 'granted', 'revoked');
CREATE TYPE transcript_status AS ENUM ('not_started', 'queued', 'processing', 'ready', 'failed');
CREATE TYPE artifact_kind AS ENUM ('recording_video', 'recording_audio', 'transcript', 'summary_document', 'attachment');
CREATE TYPE payment_status AS ENUM ('pending', 'succeeded', 'failed', 'requires_action', 'refunded', 'partially_refunded');
CREATE TYPE refund_status AS ENUM ('pending', 'succeeded', 'failed', 'cancelled');
CREATE TYPE room_status AS ENUM ('provisioning', 'ready', 'open', 'closed', 'failed');
CREATE TYPE event_source AS ENUM ('system', 'advisor', 'client', 'admin', 'daily_webhook', 'stripe_webhook');
CREATE TYPE advisory_dispute_status AS ENUM ('open', 'investigating', 'resolved_client_favor', 'resolved_advisor_favor', 'dismissed');
CREATE TYPE external_calendar_provider AS ENUM ('google', 'microsoft');

-- Users and auth domain
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email CITEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_roles (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, role)
);

CREATE TABLE advisor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  status profile_status NOT NULL DEFAULT 'draft',
  headline TEXT NOT NULL,
  short_bio TEXT NOT NULL,
  long_bio TEXT NOT NULL,
  location_text TEXT,
  languages TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  years_experience SMALLINT,
  linkedin_url TEXT,
  website_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  average_rating NUMERIC(3,2),
  review_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE advisor_taxonomies (
  id BIGSERIAL PRIMARY KEY,
  taxonomy_type TEXT NOT NULL CHECK (taxonomy_type IN ('industry', 'function', 'topic', 'executive_tag')),
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  UNIQUE (taxonomy_type, slug)
);

CREATE TABLE advisor_profile_taxonomies (
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id) ON DELETE CASCADE,
  taxonomy_id BIGINT NOT NULL REFERENCES advisor_taxonomies(id) ON DELETE CASCADE,
  PRIMARY KEY (advisor_profile_id, taxonomy_id)
);

CREATE TABLE advisor_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  metric TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE advisor_case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  challenge TEXT NOT NULL,
  outcome TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pricing and offerings
CREATE TABLE session_offerings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_minutes SMALLINT NOT NULL CHECK (duration_minutes > 0),
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  currency CHAR(3) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Scheduling core (platform-owned scheduling)
CREATE TABLE advisor_availability_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id) ON DELETE CASCADE,
  weekday SMALLINT NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_local_time TIME NOT NULL,
  end_local_time TIME NOT NULL,
  timezone TEXT NOT NULL,
  slot_interval_minutes SMALLINT NOT NULL CHECK (slot_interval_minutes IN (15, 30, 60)),
  minimum_notice_minutes INTEGER NOT NULL DEFAULT 60,
  pre_buffer_minutes SMALLINT NOT NULL DEFAULT 0,
  post_buffer_minutes SMALLINT NOT NULL DEFAULT 0,
  max_daily_bookings SMALLINT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (end_local_time > start_local_time)
);

CREATE TABLE advisor_blackout_periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id) ON DELETE CASCADE,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (ends_at > starts_at)
);

CREATE TABLE external_calendar_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id) ON DELETE CASCADE,
  provider external_calendar_provider NOT NULL,
  provider_account_id TEXT NOT NULL,
  encrypted_access_token TEXT NOT NULL,
  encrypted_refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  last_synced_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (advisor_profile_id, provider, provider_account_id)
);

CREATE TABLE advisor_busy_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id) ON DELETE CASCADE,
  external_calendar_connection_id UUID REFERENCES external_calendar_connections(id) ON DELETE SET NULL,
  source_event_id TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  source_provider external_calendar_provider,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (ends_at > starts_at)
);

CREATE TABLE slot_holds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id) ON DELETE CASCADE,
  client_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_offering_id UUID NOT NULL REFERENCES session_offerings(id),
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  released_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (ends_at > starts_at),
  CHECK (expires_at > created_at)
);

-- booking lifecycle and meeting orchestration
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id),
  advisor_user_id UUID NOT NULL REFERENCES users(id),
  client_user_id UUID NOT NULL REFERENCES users(id),
  session_offering_id UUID NOT NULL REFERENCES session_offerings(id),
  slot_hold_id UUID UNIQUE REFERENCES slot_holds(id),
  status booking_status NOT NULL DEFAULT 'draft',
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  currency CHAR(3) NOT NULL,
  platform_fee_cents INTEGER NOT NULL DEFAULT 0,
  advisor_payout_cents INTEGER NOT NULL DEFAULT 0,
  cancellation_reason TEXT,
  cancelled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (ends_at > starts_at),
  CHECK (advisor_user_id <> client_user_id)
);

CREATE TABLE booking_state_history (
  id BIGSERIAL PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  previous_status booking_status,
  next_status booking_status NOT NULL,
  changed_by_user_id UUID REFERENCES users(id),
  source event_source NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE booking_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  party consent_party NOT NULL,
  status consent_status NOT NULL DEFAULT 'pending',
  policy_version TEXT NOT NULL,
  policy_region TEXT,
  policy_presented_at TIMESTAMPTZ,
  consented_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  UNIQUE (booking_id, party)
);

CREATE TABLE meeting_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  provider_name TEXT NOT NULL DEFAULT 'daily',
  provider_room_id TEXT NOT NULL UNIQUE,
  provider_room_name TEXT NOT NULL,
  status room_status NOT NULL DEFAULT 'provisioning',
  join_url TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  recording_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  transcript_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (ends_at > starts_at)
);

CREATE TABLE meeting_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_room_id UUID NOT NULL REFERENCES meeting_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  join_token_hash TEXT,
  can_rejoin BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (meeting_room_id, user_id)
);

CREATE TABLE meeting_events (
  id BIGSERIAL PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  meeting_room_id UUID REFERENCES meeting_rooms(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_payload JSONB NOT NULL DEFAULT '{}'::JSONB,
  occurred_at TIMESTAMPTZ NOT NULL,
  source event_source NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Stripe billing + refund domain
CREATE TABLE stripe_customers (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  payer_user_id UUID NOT NULL REFERENCES users(id),
  provider TEXT NOT NULL DEFAULT 'stripe',
  provider_payment_intent_id TEXT NOT NULL UNIQUE,
  amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
  currency CHAR(3) NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  captured_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  failure_reason TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE refunds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  provider_refund_id TEXT UNIQUE,
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  status refund_status NOT NULL DEFAULT 'pending',
  reason TEXT,
  initiated_by_user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- S3 artifact storage and transcription pipeline
CREATE TABLE booking_artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  artifact_kind artifact_kind NOT NULL,
  storage_provider TEXT NOT NULL DEFAULT 'aws_s3',
  s3_bucket TEXT NOT NULL,
  s3_key TEXT NOT NULL,
  content_type TEXT,
  byte_size BIGINT,
  sha256_checksum TEXT,
  retention_delete_after TIMESTAMPTZ,
  uploaded_by_user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (s3_bucket, s3_key)
);

CREATE TABLE transcription_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  input_artifact_id UUID NOT NULL REFERENCES booking_artifacts(id) ON DELETE RESTRICT,
  output_artifact_id UUID REFERENCES booking_artifacts(id) ON DELETE SET NULL,
  provider TEXT NOT NULL DEFAULT 'openai',
  provider_job_id TEXT,
  model_name TEXT NOT NULL,
  language TEXT,
  status transcript_status NOT NULL DEFAULT 'queued',
  error_message TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Post-session and trust operations
CREATE TABLE booking_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  reviewer_user_id UUID NOT NULL REFERENCES users(id),
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id),
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  opened_by_user_id UUID NOT NULL REFERENCES users(id),
  status advisory_dispute_status NOT NULL DEFAULT 'open',
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  resolution_summary TEXT,
  resolved_by_user_id UUID REFERENCES users(id),
  opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

CREATE TABLE admin_notes (
  id BIGSERIAL PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  dispute_id UUID REFERENCES disputes(id) ON DELETE CASCADE,
  author_user_id UUID NOT NULL REFERENCES users(id),
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (booking_id IS NOT NULL OR dispute_id IS NOT NULL)
);

-- Index strategy for marketplace queries.
CREATE INDEX idx_advisor_profiles_status_verified ON advisor_profiles(status, is_verified);
CREATE INDEX idx_advisor_profile_taxonomy_taxonomy_id ON advisor_profile_taxonomies(taxonomy_id);
CREATE INDEX idx_session_offerings_advisor_active ON session_offerings(advisor_profile_id, is_active);
CREATE INDEX idx_availability_rules_advisor_weekday ON advisor_availability_rules(advisor_profile_id, weekday) WHERE is_active;
CREATE INDEX idx_busy_blocks_advisor_range ON advisor_busy_blocks(advisor_profile_id, starts_at, ends_at);
CREATE INDEX idx_slot_holds_expires_at ON slot_holds(expires_at) WHERE released_at IS NULL;
CREATE INDEX idx_bookings_advisor_start ON bookings(advisor_profile_id, starts_at DESC);
CREATE INDEX idx_bookings_client_start ON bookings(client_user_id, starts_at DESC);
CREATE INDEX idx_bookings_status_start ON bookings(status, starts_at DESC);
CREATE INDEX idx_booking_state_history_booking ON booking_state_history(booking_id, created_at DESC);
CREATE INDEX idx_booking_consents_booking_status ON booking_consents(booking_id, status);
CREATE INDEX idx_meeting_events_booking_occurred_at ON meeting_events(booking_id, occurred_at);
CREATE INDEX idx_payments_status_created ON payments(status, created_at DESC);
CREATE INDEX idx_refunds_payment_status ON refunds(payment_id, status);
CREATE INDEX idx_artifacts_booking_kind ON booking_artifacts(booking_id, artifact_kind);
CREATE INDEX idx_transcription_jobs_status_submitted ON transcription_jobs(status, submitted_at DESC);
CREATE INDEX idx_disputes_status_opened ON disputes(status, opened_at DESC);

-- No overlapping active slot holds for same advisor time range.
ALTER TABLE slot_holds
  ADD CONSTRAINT slot_holds_no_overlap
  EXCLUDE USING gist (
    advisor_profile_id WITH =,
    tstzrange(starts_at, ends_at, '[)') WITH &&
  )
  WHERE (released_at IS NULL);

-- No overlapping confirmed/joinable/in-session bookings for same advisor.
ALTER TABLE bookings
  ADD CONSTRAINT bookings_no_overlap_active
  EXCLUDE USING gist (
    advisor_profile_id WITH =,
    tstzrange(starts_at, ends_at, '[)') WITH &&
  )
  WHERE (status IN ('confirmed', 'awaiting_consent', 'ready_to_join', 'in_session'));

-- Automatic updated_at maintenance.
CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_advisor_profiles_updated_at
BEFORE UPDATE ON advisor_profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_session_offerings_updated_at
BEFORE UPDATE ON session_offerings
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_advisor_availability_rules_updated_at
BEFORE UPDATE ON advisor_availability_rules
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_external_calendar_connections_updated_at
BEFORE UPDATE ON external_calendar_connections
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_meeting_rooms_updated_at
BEFORE UPDATE ON meeting_rooms
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_stripe_customers_updated_at
BEFORE UPDATE ON stripe_customers
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_payments_updated_at
BEFORE UPDATE ON payments
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_refunds_updated_at
BEFORE UPDATE ON refunds
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_booking_reviews_updated_at
BEFORE UPDATE ON booking_reviews
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMIT;
