# ADR 0001: Next.js With An Explicit BFF Boundary

## Status

Accepted.

## Context

The chosen backend exposes gRPC services and expects server-friendly transport behavior, cookies, and request metadata such as forwarded client IP. The challenge also asks for real backend integration, resilient auth UX, and clear frontend architecture.

## Decision

Use `Next.js App Router` with an explicit `BFF` layer implemented through `Route Handlers`.

The browser will not call gRPC directly.

## Consequences

Positive:

- one repository for UI, route handling, cookies, and server transport
- explicit transport boundary
- straightforward session orchestration and refresh logic
- easier explanation of architecture and trade-offs in `README.md`

Negative:

- more server-layer code than a pure SPA
- tighter coupling to Next.js runtime conventions

## Alternatives Rejected

- Browser-direct gRPC transport: rejected because it weakens the boundary and complicates auth/session handling.
- SPA plus separate BFF project: rejected because it adds avoidable structural overhead for this challenge.
- Server Actions as the main mutation boundary: rejected because explicit route handlers are clearer for transport mapping and testing.
