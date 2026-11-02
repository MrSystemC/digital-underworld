# Six implemented product stages

## 1 — WORLD 2.0
- Seeded map with four fictional districts and descriptive lore.
- District discovery endpoint, idempotent exploration reward and reputation point.
- Four community factions and membership selection.
- Responsive grid-map UI.

## 2 — AI SOCIETY
- Four named NPC personas with distinct roles and response styles.
- Persistent user/NPC chat history in the database.
- Persona response engine uses recent user messages as short-term conversational context.
- This is a deterministic local simulation, not a connected large language model. External AI-provider integration remains a separately configured enhancement.

## 3 — GOVERNANCE
- Members can publish proposals and vote yes/no.
- Database uniqueness constraint enforces one vote per account per proposal.
- Administrators can close voting and inspect audit events/reports.
- Members can submit moderation reports.

## 4 — DIGITAL ASSETS
- Four collectible badges.
- Automatic Founder's Mark claim on registration.
- Reputation-gated achievement claims.
- Unique ownership constraint and provenance timestamp.
- Off-chain and non-transferable by design; no public minting or secondary market.

## 5 — GLOBAL ECONOMY
- Welcome balance, district discovery rewards, contribution rewards and cosmetic purchases.
- Append-only ledger records credits earned and spent.
- Daily rewards are idempotent and require a corresponding contribution that day.
- Credits cannot be transferred, redeemed or exchanged for cash.

## 6 — GLOBAL ACCESS
- Responsive browser application and JSON REST API.
- Account registration/login, PBKDF2-HMAC-SHA256 password hashing and signed HMAC JWT sessions.
- English/Russian interface labels and persisted language preference.
- PostgreSQL Docker deployment path and SQLite local-development fallback.

## Operational maturity
All six stages have functional MVP code and API/UI paths. Public hosting, production secrets, managed database, backups, observability, rate limits, email verification, password recovery, independent security audit and full content localization must be completed before a public production launch.