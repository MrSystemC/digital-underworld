# DIGITAL UNDERWORLD — THE NEW WORLD

**Version 1.1.0 · Six product layers + Admin Control Centre**

A fictional international social-simulation platform. Core source is packaged in [digital-underworld-v1.0.0-mvp.zip](./digital-underworld-v1.0.0-mvp.zip); the root Docker build overlays the protected admin module and interface.

## Six stages
1. **WORLD 2.0** — fictional districts, exploration, factions and discovery rewards.
2. **AI SOCIETY** — persistent NPC personas, chat history and local deterministic dialogue.
3. **GOVERNANCE** — proposals, one-account-one-vote polls, moderation reports and audit records.
4. **DIGITAL ASSETS** — off-chain, non-transferable collectibles with ownership and provenance.
5. **GLOBAL ECONOMY** — fictional non-redeemable credits, ledger, contribution rewards and cosmetic shop.
6. **GLOBAL ACCESS** — responsive web UI, English/Russian interface, accounts and REST API.

## Admin Control Centre
Open `/admin`. Role levels: `super_admin`, `administrator`, `moderator`, `member`. The first super administrator must be bootstrapped from a trusted server shell after account registration: `python -m app.bootstrap_admin your-account@example.com`. The bootstrap refuses if a super administrator already exists. See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md).

The admin UI provides overview, member/role management, report workflow, chronicle visibility, governance review, economy ledger, collectible ownership counts, NPC registry and audit trail. All sensitive endpoints enforce server-side role checks.

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
The root `Dockerfile` unpacks the core source archive, overlays the admin routes/UI, applies the role-guard patch and installs dependencies. Use Docker runtime. Configure a unique strong `SECRET_KEY` and a persistent managed PostgreSQL `DATABASE_URL` before public launch. Do not use SQLite on an ephemeral filesystem for production user data.

## Verification and limits
The six-stage core MVP has passing syntax and API tests. The admin overlay is validated separately with role-based tests. Docker runtime must be verified by the hosted deploy. The platform is not independently security-audited. Add HTTPS, CORS/trusted-host allowlists, rate limits, email verification/password recovery, migrations, backups, observability, security testing, privacy/terms/age/accessibility review and staffed moderation before inviting the public.

Credits have no cash value and cannot be transferred or redeemed. Collectibles are off-chain and non-transferable. NPC dialogue uses a local deterministic persona engine; no external LLM or blockchain is connected.
