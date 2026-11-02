# Admin Control Centre

Open `/admin`. Sign in with an existing account after assigning its role. All authorization is enforced by the API, not by hiding UI controls.

## Roles
- `super_admin`: full access; may grant or revoke every role.
- `administrator`: operational administration, member/moderator roles, governance, assets, economy, NPC registry, reports, posts and audit.
- `moderator`: overview, report queue and chronicle moderation only.
- `member`: no admin access.

## First super administrator
1. Register the intended account through the public site.
2. From a trusted server shell with the production database configured, run: `python -m app.bootstrap_admin your-account@example.com`.
3. The command refuses if a super administrator already exists and writes an audit event.
4. Sign in at `/admin`.

Never expose the bootstrap command as a public HTTP endpoint. Role changes, report status changes and post visibility changes are audited. Use HTTPS and persistent managed PostgreSQL before inviting real users.
