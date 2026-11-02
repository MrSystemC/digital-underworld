# DIGITAL UNDERWORLD — THE NEW WORLD

**Version 1.2.0 · Six product layers + expanded Admin Control Centre**

A fictional international social-simulation platform. Core source is packaged in [digital-underworld-v1.0.0-mvp.zip](./digital-underworld-v1.0.0-mvp.zip); the root Docker build overlays the admin API and interface.

## Six stages
1. **WORLD 2.0** — fictional districts, exploration, factions and discovery rewards.
2. **AI SOCIETY** — persistent NPC personas, chat history and local deterministic dialogue.
3. **GOVERNANCE** — proposals, one-account-one-vote polls, moderation reports and audit records.
4. **DIGITAL ASSETS** — off-chain, non-transferable collectibles with ownership and provenance.
5. **GLOBAL ECONOMY** — fictional non-redeemable credits, ledger, contribution rewards and cosmetic shop.
6. **GLOBAL ACCESS** — responsive web UI, English/Russian interface, accounts and REST API.

## Admin Control Centre
Open `/admin`. Roles: `super_admin`, `administrator`, `moderator`, `member`.

Management includes:
- Member directory, profile editing, role assignment, faction assignment and account suspension/restoration.
- Reputation adjustments with a mandatory reason and audit event.
- World Credits adjustments with mandatory reason and append-only ledger entry.
- Faction and district creation/editing.
- AI persona creation/editing.
- Collectible creation/editing.
- Proposal voting closure, report workflow and chronicle visibility moderation.
- Platform statistics, economy ledger, audit trail and ownership counts.

All privileged actions are checked by server-side role dependencies. Moderators are limited to overview, reports and chronicle moderation. Super-admin privileges are protected from non-super-admin changes. See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md).

The initial super-admin activation is account-bound and one-time. The eligible account signs in at `/admin`, receives the activation control only if its email hash matches the Render allowlist and no super-admin exists, then activates using its signed-in session.

This is a fictional community simulation only. It does not support real-world criminal governance, coercion, extortion, violence, illicit trade or criminal coordination.

## Run locally
```bash
unzip digital-underworld-v1.0.0-mvp.zip
cd digital-underworld-v2
cp .env.example .env
docker compose up --build
```
Open http://localhost:8000; API docs: /docs; admin: /admin.

## Render deployment
The root `Dockerfile` unpacks the core archive, overlays admin modules and UI, applies the role and suspension schema patch, then installs dependencies. Use Docker runtime. Configure a strong unique `SECRET_KEY` and persistent managed PostgreSQL `DATABASE_URL` before public production use. The currently deployed service still uses temporary SQLite until PostgreSQL is connected.

## Security and limitations
This release is an MVP, not an independently audited production service. Add rate limits, email verification/password recovery, token revocation, database migrations, backups, monitoring, penetration testing, privacy/terms/age/accessibility review and staffed moderation before public launch. Credits have no cash value and cannot be transferred or redeemed. Collectibles are off-chain and non-transferable. NPC dialogue is deterministic and local; no external LLM or blockchain is connected.
