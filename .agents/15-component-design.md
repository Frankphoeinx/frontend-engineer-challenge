# Component Design

Read when: creating, splitting, or extending React components, form fields, page composition, or shared UI primitives.  
Priority: subordinate to `AGENTS.md` and `.agents/00-core.md`.  
Related: `.agents/10-frontend-architecture.md`, `.agents/20-ui-system.md`, `.agents/40-state-and-data-flow.md`.

## Responsibility Levels

- Every component must own exactly one primary responsibility level: `page composition`, `feature orchestration`, `view`, or `shared primitive`.
- Do not mix transport logic, async orchestration, and visual rendering in the same component unless the component is truly trivial.
- A page component should compose sections and pass props. It should not contain business logic.
- A feature orchestration component may manage scenario state, submit flows, and backend result mapping. It should not own low-level visual styling details.
- A shared primitive should only solve reusable presentation or interaction concerns. It must not know feature-specific workflows.

## Boundary Rules

- Do not import routing, backend, or feature-specific modules into shared UI primitives.
- Shared UI primitives must not depend on `fetch`, `next/navigation`, `react-hook-form`, or server-only modules.
- Do not pass visual-only internal state from a feature component into a primitive just to make the primitive render correctly.
- If a primitive needs external state only for internal visual behavior, redesign the primitive boundary.

## View And Orchestration Split

- If a component performs async loading, mutation, redirect, or response mapping and also renders substantial JSX, split it into orchestration and view layers.
- Keep side effects in hooks or feature-level container components.
- Keep presentational components deterministic from props whenever practical.
- A view component should be understandable without knowing transport or routing details.

## Shared Primitive Rules

- Shared primitives must expose a small, explicit API.
- Do not add props that exist only for one screen unless the pattern is clearly reusable.
- Prefer one explicit `variant` prop over multiple booleans that can conflict.
- Do not create reusable wrappers that only forward all props without adding a stable responsibility.
- Do not add placeholder or layout props that leak implementation details unless there is a clear repeated need.

## Form Component Rules

- Field primitives should own field-level presentation, accessibility wiring, and local interaction state.
- Feature forms should own validation, submit flow, backend error mapping, and navigation decisions.
- Password visibility, focus presentation, floating-label behavior, and trailing icon toggles belong to the field primitive layer.
- Backend validation state, submit pending state, and form-level alerts belong to the feature form layer.
- Do not require the feature form to pass field value into a primitive only to support label animation or similar visual behavior.

## Reuse Rules

- Extract a shared component only when the abstraction reduces total complexity.
- Prefer local duplication over premature abstraction when the pattern is still evolving.
- Before extracting a reusable component, confirm what responsibility it owns.
- Before extracting a reusable component, confirm where it will be reused.
- Before extracting a reusable component, confirm whether its API stays smaller than the duplicated code it replaces.
- If those answers are unclear, keep the component local to the feature.

## Complexity Triggers

- Split a component when it has more than one independent conditional state branch.
- Split a component when visual rendering and scenario orchestration become hard to scan together.
- Split a component when unrelated props accumulate around different concerns.
- Split a component when multiple consumers need only distinct subsets of its behavior.

## Prop Design Rules

- Props must describe intent, not implementation detail.
- Avoid APIs that allow impossible or contradictory states.
- Do not expose booleans for multi-state behavior.
- Prefer required props for core behavior over large optional prop surfaces.
- If a prop exists only to patch one consumer’s edge case, reconsider the boundary before adding it.

## Review Checklist

- Check whether the component knows too much about its parent flow.
- Check whether the parent knows too much about the component’s internal rendering behavior.
- Check whether async orchestration is leaking into shared UI.
- Check whether visual state is leaking upward into feature logic.
- Check whether the API is still understandable without reading implementation details.
