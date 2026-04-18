# Observability

Read when: adding logging, error reporting, or debug instrumentation.  
Priority: subordinate to `AGENTS.md` and `.agents/00-core.md`.  
Related: `.agents/40-state-and-data-flow.md`, `.agents/60-readme-submission.md`.

## Rules

- Use one thin abstraction for logging or reporting unexpected errors.
- Never log tokens, passwords, or other sensitive auth data.
- In development, log only transport and auth events that help diagnose flow failures.
- Keep separate categories for:
  - refresh failures
  - transport mapping failures
  - unexpected backend failures

## Scope

- Observability is a bonus signal, not a reason to bloat the stack.
- Do not add heavy external services by default.
