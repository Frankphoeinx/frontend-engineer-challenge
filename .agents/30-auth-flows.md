# Auth Flows

Read when: implementing auth screens, auth route handlers, or auth-related UX behavior.  
Priority: subordinate to `AGENTS.md` and `.agents/00-core.md`.  
Related: `.agents/35-backend-contract-assumptions.md`, `.agents/40-state-and-data-flow.md`, `.agents/45-state-matrix.md`.

## Required Scenarios

- `register`
- `login`
- `forgot password`
- `reset password`
- minimal protected `account` screen to prove session behavior

## Backend Contract

The chosen backend is `sdrobov/atlantis-engineer-challenge`.

Command RPCs:

- `Register`
- `Login`
- `RefreshToken`
- `RequestPasswordReset`
- `ResetPassword`

Query RPCs:

- `GetUserByEmail`

## UX Rules

- `register`: validate `confirmPassword` locally before the request leaves the browser.
- `login`: handle invalid credentials and rate limiting as distinct cases.
- `forgot password`: always return generic success to the browser.
- `reset password`: support both `?token=` in the URL and manual token entry.
- `account`: keep it minimal and focused on proving session lifecycle, not product scope expansion.

## Error Handling Rules

- Preserve backend messages when they improve UX and do not leak sensitive internals.
- Normalize backend `NotFound` during forgot-password into a generic success response.
- Do not show raw backend `Internal` fallback text in the UI; map it to a stable generic fallback.

## Demo Rules

- The selected backend logs reset tokens locally instead of emailing them.
- The forgot-password success state and `README.md` must explain that the reset token is taken from backend logs for local demo purposes.
