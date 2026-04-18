# Core Rules

Read when: always.  
Priority: after `AGENTS.md`, before all other `.agents/*` modules.  
Related: all project modules.

## Engineering Defaults

- Use `Next.js App Router`.
- Use `Node.js runtime` only.
- Use `TypeScript` in strict mode.
- Use `BFF` through `Route Handlers`.
- Vendor backend protobuf contracts and generate typed clients with `Buf`.
- Use `CSS Modules` and `CSS variables` for tokens.
- Use `react-hook-form` with `zod` for auth forms.
- Do not introduce a global store by default.

## General Change Rules

- Start by identifying the affected boundaries, contracts, and failure modes.
- Keep UI, transport, orchestration, and persistence assumptions separated.
- Do not hide backend errors if that would make behavior misleading.
- Silent normalization is allowed only as an intentional BFF decision and must be documented.
- Prefer a small correct change over a broad refactor.
- Preserve existing behavior unless a task explicitly changes it.

## Naming And Layering Defaults

- `features` own user flows and submit behavior.
- `entities` own client-side domain models and read models.
- `shared` owns primitives, generic helpers, and reusable infrastructure.
- `server` owns gRPC integration, cookies, BFF handlers, and auth/session orchestration.

## Documentation Defaults

- Keep project-facing docs in English.
- Document decisions through concrete trade-offs, not generic claims.
- When a backend or framework limitation influences the frontend, write it down explicitly.
