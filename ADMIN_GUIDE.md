# Admin Control Centre

Open `/admin`. Sign in with an existing account after assigning its role. All authorization is enforced by the API, not by hiding UI controls.

## Roles
- `super_admin`: full access; may grant or revoke every role.
- `administrator`: operational administration, member/moderator roles, governance, assets, economy, NPC registry, reports, posts and audit.
- `moderator`: overview, report queue and chronicle moderation only.
- `member`: no admin access.

## First super administrator (free-hosting compatible)
1. Register the intended account through the public site.
2. Use the one-time endpoint with the bootstrap token supplied by the project owner:
```bash
curl -X POST https://digital-underworld.onrender.com/api/admin/bootstrap/first-super-admin \
  -H "Content-Type: application/json" \
  -H "X-Admin-Bootstrap-Token: YOUR_ONE_TIME_TOKEN" \
  -d '{"email":"your-registered-email@example.com"}'
```
3. It refuses if a super administrator already exists and writes an audit event. Once successful, the endpoint is permanently disabled by the database role check.
4. Sign in at `/admin`.

The bootstrap token is stored only as a Render environment secret; do not commit it, post it publicly, or reuse it. Role changes, report status changes and post visibility changes are audited. Use HTTPS and persistent managed PostgreSQL before inviting real users.
