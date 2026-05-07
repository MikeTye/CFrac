# Advisor Mock Interface Contract Notes

- Timestamp format: ISO-8601 UTC (`YYYY-MM-DDTHH:mm:ssZ`).
- Date-only format: `YYYY-MM-DD`.
- Money: integer `*_cents`, currency ISO-4217 (e.g. `USD`).
- IDs: stable opaque strings (`adv_*`, `apt_*`, `inv_*`, `dsp_*`).

## Required enums
- `advisor.status`: `invited|registered|profile_pending|available|booked|in_session|session_completed|payment_pending|payment_confirmed|closed`
- `payments[].status`: `pending|confirmed|failed`
- `transcript.status`: `processing|ready_for_review|finalized`
- `disputes[].status`: `open|under_review|resolved|rejected`
- `appointments[].booking_state` parity with PRD state machine.

## Required vs optional (backend parity)
- Required (all payloads): `schema_version`.
- Required appointment core: `appointment_id`, `advisor_status`, `booking_state`, `payment_status`, `session.starts_at`, `session.ends_at`.
- Optional: provider-specific metadata (`provider_room_id`, `processor_ref`, etc.) can be appended without breaking UI contracts.
- Additive-only evolution: new fields must be optional by default.

## Backend parity notes
- Keep field names aligned with future API DTOs to permit drop-in replacement.
- UI should not derive critical state from text labels; use explicit enum fields.
- Closure CTA must read `payment_status` and `advisor_status` directly, not inferred from timestamps.
- Transcript finalize CTA must check `transcript.session_state_required_for_finalize` and live appointment status.
