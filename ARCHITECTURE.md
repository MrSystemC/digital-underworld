# Architecture

- **Client:** responsive vanilla HTML/CSS/JS; English/Russian preference.
- **API:** FastAPI REST endpoints under `/api`.
- **Persistence:** SQLAlchemy; SQLite for local quick start, PostgreSQL in Docker/production.
- **Identity:** Argon2 password hashing; signed JWT bearer tokens.
- **World 2.0:** districts, discovery, factions and reputation.
- **AI Society:** persisted user/NPC message history and deterministic persona response adapter.
- **Governance:** proposals, unique per-user vote constraint, audit events and reports.
- **Assets:** unique user/asset claims and claim provenance records; no transfers.
- **Economy:** ledger-backed fictional credits and daily reward idempotency; no cash value.

## Trust boundaries
Every protected API route requires a bearer token. Admin routes check the database role. User-generated content is length-limited and escaped in the client. Public feeds exclude hidden posts. One vote per account per proposal is enforced by a database unique constraint.

## Known MVP limitations
No email verification, password reset, rate limiting, token revocation, migrations, live blockchain, external LLM, media uploads, payments, full localization of all seeded lore, or automated moderation model. Add these only with explicit product/security/legal review.