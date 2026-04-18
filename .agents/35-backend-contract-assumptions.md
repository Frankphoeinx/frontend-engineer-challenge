# Backend Contract Assumptions

Read when: touching protobuf contracts, gRPC adapters, BFF mapping, or `README.md` assumptions.  
Priority: subordinate to `AGENTS.md` and `.agents/00-core.md`.  
Related: `.agents/30-auth-flows.md`, `.agents/40-state-and-data-flow.md`, `.agents/adr/0002-proto-contract-and-bff-boundary.md`.

## Chosen Backend

- Backend fork: `https://github.com/sdrobov/atlantis-engineer-challenge`
- Pinned backend commit: `a4a384107169f95b8873850c6d5a2700248bd156`
- Upstream protobuf source path: `api/proto/auth/v1/auth.proto`
- Backend generated Go code path: `gen/go/auth/v1/`

## Frontend Contract Storage

- Vendor the backend contract into the frontend repository at `proto/backend/auth/v1/auth.proto`.
- Generate TypeScript client code into `src/server/grpc/gen/auth/v1/`.
- Do not edit generated files by hand.
- If the vendored proto changes, update the pinned backend commit and document the change in `README.md`.

## Expected RPC Surface

- `AuthCommandService.Register`
- `AuthCommandService.Login`
- `AuthCommandService.RefreshToken`
- `AuthCommandService.RequestPasswordReset`
- `AuthCommandService.ResetPassword`
- `AuthQueryService.GetUserByEmail`

## Expected gRPC Statuses

- `InvalidArgument`: invalid email, weak password, invalid reset token
- `AlreadyExists`: email already registered
- `Unauthenticated`: invalid credentials, invalid auth token, invalid refresh token
- `ResourceExhausted`: backend rate limiting
- `NotFound`: password reset email not found, user not found
- `Internal`: generic backend failure fallback

## BFF Normalization Rules

- Map gRPC failures to stable HTTP responses inside the BFF boundary.
- Normalize forgot-password `NotFound` to a generic accepted success response.
- Preserve useful validation and auth failures when they help the UI express a real state.
- Document every intentional normalization in `README.md` as an assumption or trade-off.

## Mismatch Rules

- If frontend behavior must adapt around a backend limitation, treat that as an explicit contract assumption.
- Do not hide mismatches behind ad-hoc hacks or undocumented local conventions.
