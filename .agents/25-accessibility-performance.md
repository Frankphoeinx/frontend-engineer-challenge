# Accessibility And Performance

Read when: building forms, interactive components, loading states, or route-level rendering behavior.  
Priority: subordinate to `AGENTS.md` and `.agents/00-core.md`.  
Related: `.agents/20-ui-system.md`, `.agents/45-state-matrix.md`.

## Accessibility Rules

- Keep `label` and input associations correct.
- Use `aria-invalid`, `aria-describedby`, and `aria-live` where they materially improve the experience.
- Support keyboard navigation on every auth screen.
- Keep focus states visible.
- Use correct disabled and loading semantics.
- After submit, error, or success transitions, move or preserve focus predictably.

## Performance Rules

- Do not hydrate more than necessary.
- Use client components only where interactivity requires them.
- Avoid redundant re-renders and unstable dependencies.
- Loading indicators must not introduce layout shift.
- Do not pull in heavy UI libraries without a strong reason.
