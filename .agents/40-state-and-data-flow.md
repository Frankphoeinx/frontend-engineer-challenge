# State And Data Flow

Read when: implementing cookies, refresh logic, route handlers, async flows, or request orchestration.  
Priority: subordinate to `AGENTS.md` and `.agents/00-core.md`.  
Related: `.agents/30-auth-flows.md`, `.agents/35-backend-contract-assumptions.md`, `.agents/45-state-matrix.md`.

## State Model

- Form state lives locally inside the owning feature.
- Session state is represented by server-managed cookies and `/api/session/me`.
- Token refresh orchestration lives behind one helper path, not duplicated across screens.

## Cookie Rules

Use these cookie names unless a later project decision intentionally replaces them:

- `orbitto_auth_token`
- `orbitto_refresh_token`
- `orbitto_session_email`

Cookie expectations:

- `httpOnly`
- `sameSite=lax`
- `secure` in production
- expiry aligned with backend token TTLs

Access and refresh tokens must not be readable from client-side JavaScript.

## Network Orchestration Rules

- Provide one browser helper for authenticated requests.
- Refresh on `401` only once per failed request.
- Deduplicate parallel refresh attempts with a single-flight strategy.
- Retry the original request at most once after a successful refresh.
- Abort or ignore stale requests when the owning UI has already moved on.

## Race Condition Rules

- Disable repeated submits while a request is in flight.
- Do not allow parallel refresh storms.
- Do not update UI from outdated responses after a newer request has already won.

## Error Model

- Map `gRPC -> HTTP` inside the BFF boundary.
- Map `HTTP -> typed UI error` inside the browser layer.
- Keep transport details out of low-level visual components.
