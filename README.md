# DIGITAL UNDERWORLD — THE NEW WORLD

**Version 1.0.0 MVP · Six functional product layers**

A fictional international social-simulation platform. The complete source package is included in [digital-underworld-v1.0.0-mvp.zip](./digital-underworld-v1.0.0-mvp.zip).

## Six stages
1. **WORLD 2.0** — fictional districts, exploration, factions and discovery rewards.
2. **AI SOCIETY** — persistent NPC personas, chat history and local deterministic dialogue.
3. **GOVERNANCE** — proposals, one-account-one-vote polls, moderation reports and audit records.
4. **DIGITAL ASSETS** — off-chain, non-transferable collectibles with ownership and provenance.
5. **GLOBAL ECONOMY** — fictional non-redeemable credits, ledger, contribution rewards and cosmetic shop.
6. **GLOBAL ACCESS** — responsive web UI, English/Russian interface, accounts and REST API.

This is a fictional community simulation only. It does not support real-world criminal governance, coercion, extortion, violence, illicit trade or criminal coordination.

## Run
```bash
unzip digital-underworld-v1.0.0-mvp.zip
cd digital-underworld-v2
cp .env.example .env
docker compose up --build
```
Open http://localhost:8000; API docs: /docs. Without Docker: `pip install -r requirements.txt && uvicorn app.main:app --reload` (SQLite default; Compose uses PostgreSQL 16).

## Verification
Python syntax, API integration test and JavaScript syntax checks passed. Docker runtime was not verified because Docker CLI was unavailable. Public hosting is not configured.

## Production hardening
Before launch: strong unique SECRET_KEY, managed PostgreSQL with backups/PITR, HTTPS, CORS/trusted-host allowlists, rate limiting, email verification/password recovery, migrations, observability, security testing, privacy/terms/age/accessibility review and human moderation. This MVP is not independently security-audited.

Credits have no cash value and cannot be transferred or redeemed. Collectibles are off-chain and non-transferable. NPC dialogue uses a local deterministic persona engine; no external LLM or blockchain is connected.
