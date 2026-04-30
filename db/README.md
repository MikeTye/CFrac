# Database Setup (PostgreSQL)

This folder contains the baseline PostgreSQL schema for the advisory marketplace MVP.

## Migrations

1. `000_extensions.sql`
   - Enables PostgreSQL extensions used by the schema: `pgcrypto`, `citext`, and `btree_gist`.
2. `001_marketplace_schema.sql`
   - Creates core marketplace tables, enums, constraints, indexes, and updated-at triggers.

## Coverage Highlights

- Marketplace auth and role model (`users`, `user_roles`)
- Advisor profile + structured taxonomy support
- In-house scheduling (`advisor_availability_rules`, blackout periods, busy blocks, slot holds)
- Booking lifecycle and status history
- Daily.co-ready meeting room and meeting event model
- Stripe payments + refunds
- AWS S3 artifact tracking for recordings/transcripts/documents
- OpenAI transcription job tracking
- Consent capture and dispute/admin audit records

## Usage

Run in order against a PostgreSQL database:

```bash
psql "$DATABASE_URL" -f db/migrations/000_extensions.sql
psql "$DATABASE_URL" -f db/migrations/001_marketplace_schema.sql
```
