# State Matrix

Read when: building auth screens, screen logic, or acceptance criteria for UI states.  
Priority: subordinate to `AGENTS.md` and `.agents/00-core.md`.  
Related: `.agents/30-auth-flows.md`, `.agents/40-state-and-data-flow.md`, `.agents/50-testing.md`.

An auth screen is not complete until every required state for that screen is explicitly handled.

## Register

- initial
- pending submit
- field validation error
- backend validation error
- duplicate email error
- generic backend unavailable state
- success

## Login

- initial
- pending submit
- field validation error
- invalid credentials
- rate limited
- generic backend unavailable state
- success redirect

## Forgot Password

- initial
- pending submit
- field validation error
- generic accepted success
- rate limited
- generic backend unavailable state

## Reset Password

- initial with token from query
- initial with manual token entry
- pending submit
- field validation error
- invalid or expired token
- generic backend unavailable state
- success

## Account

- loading session
- authenticated success state
- expired or invalid session
- refresh in progress
- generic backend unavailable state
- logged-out redirect
