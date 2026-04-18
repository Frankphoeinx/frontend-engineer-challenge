# Frontend Architecture

Read when: changing project structure, routes, boundaries, or integration shape.  
Priority: subordinate to `AGENTS.md` and `.agents/00-core.md`.  
Related: `.agents/35-backend-contract-assumptions.md`, `.agents/40-state-and-data-flow.md`, `.agents/adr/0001-nextjs-bff.md`, `.agents/adr/0002-proto-contract-and-bff-boundary.md`.

## Target Layout

- `app/`: route composition, layouts, route handlers, and page-level assembly.
- `src/server/`: server-only transport, metadata helpers, cookie/session orchestration, and BFF use-cases.
- `src/features/`: auth forms, local async state, submit handlers, and screen-specific logic.
- `src/entities/`: `user` and `session` read models plus light client-facing domain helpers.
- `src/shared/`: UI primitives, generic utilities, configuration, and non-domain infrastructure.

## Boundary Rules

- Never import `src/server/*` into client components.
- Never expose protobuf-generated shapes to the browser layer.
- The browser talks only to JSON BFF endpoints.
- Cookies and token lifecycle live only in the server boundary.
- Do not call `fetch`, `gRPC`, or cookie utilities directly from visual components.

## Composition Rules

- A page composes features and widgets.
- A feature owns its form state, validation schema, and submit flow.
- The BFF layer owns contract mapping, status mapping, and cookie/session orchestration.
- Shared UI primitives stay presentation-focused and do not absorb business logic.

## Next.js Rules

- Prefer `Server Components` by default.
- Use `Client Components` only where interactivity is required.
- Mark server-only modules with `server-only` when that improves safety.
- Do not rely on framework magic where an explicit route or adapter boundary is clearer.

## Positive Architectural Signals

- FSD-like boundaries are welcome when the ownership line is clear.
- A typed contract strategy is a feature, not overhead.
- Prefer composition over large all-in-one pages or god components.
