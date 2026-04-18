# UI System

Read when: building or changing UI, component APIs, visual states, or responsive layout.  
Priority: subordinate to `AGENTS.md` and `.agents/00-core.md`.  
Related: `.agents/25-accessibility-performance.md`, `.agents/30-auth-flows.md`, `.agents/45-state-matrix.md`.

## Figma Fidelity Rules

- Follow the provided Figma for layout, visual hierarchy, spacing, typography, and component states.
- Do not turn the challenge into a free redesign.
- Any deliberate deviation from the Figma must be documented in `README.md` with a concrete trade-off.

## Mini Design System

Create and use a small internal UI kit with:

- color tokens
- spacing tokens
- radius tokens
- border tokens
- shadow tokens
- focus tokens
- typography tokens

Base primitives should include:

- `Button`
- `TextField`
- `PasswordField`
- `InlineAlert`
- `Spinner`
- `FormField`
- `AuthCard`

## Component Rules

- One component should have one clear visual responsibility.
- Do not mix layout, business logic, and transport concerns in the same component.
- Avoid overly configurable multipurpose components.
- Prefer explicit variants over clusters of loosely related boolean props.

## Responsive Rules

- Desktop and mobile are both required.
- Make breakpoint-driven layout changes explicit and stable.
- Do not rely on mobile-only hacks or desktop-only assumptions.

## Bonus Signal

- A small, coherent UI-kit inside the solution is encouraged.
