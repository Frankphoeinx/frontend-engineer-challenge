# AGENTS

This repository uses modular agent instructions. Treat this file as the top-level index and the primary source of truth for how work must be done in this project.

## Priority Order

Apply instructions in this order:

1. `AGENTS.md`
2. `.agents/00-core.md`
3. Task-specific `.agents/*` modules
4. `.agents/adr/*`
5. `README.md`

If two files conflict, follow the higher-priority file and do not silently blend the rules.

## Read Protocol

Always read `.agents/00-core.md`.

Read additional modules when relevant:

- Architecture, folder layout, or boundaries: `.agents/10-frontend-architecture.md`
- Component boundaries, reuse, and view/orchestration split: `.agents/15-component-design.md`
- UI, Figma fidelity, or component design: `.agents/20-ui-system.md`
- Accessibility or performance: `.agents/25-accessibility-performance.md`
- Auth screens or auth behavior: `.agents/30-auth-flows.md`
- Backend contract assumptions or protobuf integration: `.agents/35-backend-contract-assumptions.md`
- Session handling, cookies, refresh, or async flows: `.agents/40-state-and-data-flow.md`
- Required screen states and edge-case coverage: `.agents/45-state-matrix.md`
- Tests and verification scope: `.agents/50-testing.md`
- Definition of done or completion checks: `.agents/55-verification-and-dod.md`
- README or submission prep: `.agents/60-readme-submission.md`
- Logging or frontend observability: `.agents/65-observability.md`
- Architecture trade-off disputes: `.agents/adr/*`

## Non-Negotiable Boundaries

- Use English for code, comments, identifiers, file names, docs, commit messages, and other project-facing artifacts.
- Make the smallest correct change that solves the task.
- Do not touch unrelated files or mix unrelated cleanups into the same change.
- Do not add local rules or make implementation changes that contradict the challenge rules and requirements from the upstream README: `https://github.com/atls-academy/frontend-engineer-challenge/blob/master/README.md`.
- Do not add dependencies without a clear engineering reason.
- Do not build a flat `components/ + services/` structure.
- Do not call backend gRPC directly from the browser.
- Do not mix transport, orchestration, and visual UI concerns in one module.
- Do not edit generated protobuf client code by hand.
- Meaningful changes are not complete without verification.

## Challenge Requirements That Must Always Hold

- Implement the required auth scenarios.
- Follow the provided Figma instead of doing a loose redesign.
- Cover loading, error, empty, and success states.
- Support desktop and mobile layouts.
- Account for accessibility and performance.
- Integrate with real backend responses and contract behavior.
- Keep `README.md` continuously up to date with material implementation decisions, architecture notes, contract assumptions, and trade-offs. Do not defer README updates until the end of the task.
- Keep `.agents/` in the repository because AI-assisted work is being used.

## Submission Checklist

Before treating the solution as ready, confirm:

- The frontend fork is in a shareable state.
- `README.md` is updated.
- Tests exist and test run instructions are documented.
- `.agents/` is present in the repository.
- A demo link or screencast is included if available.

## Rule Writing Convention

- Each `.agents/*` file should cover one topic.
- Rules must be written as direct instructions, not aspirations.
- Prefer concrete, checkable statements over vague quality language.
