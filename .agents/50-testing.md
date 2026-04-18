# Testing

Read when: adding, updating, or validating tests.  
Priority: subordinate to `AGENTS.md` and `.agents/00-core.md`.  
Related: `.agents/45-state-matrix.md`, `.agents/55-verification-and-dod.md`, `.agents/60-readme-submission.md`.

## Strategy

- Use `Playwright` for critical user flows.
- Use `Vitest` for unit-level logic, status mapping, and local helpers.
- Favor user-visible behavior and contract boundaries over implementation details.

## Required Scenarios

- register -> login -> account -> logout
- invalid login
- protected route without session
- single-flight token refresh
- forgot-password normalization
- reset-password invalid token

## Rules

- Do not rewrite tests to fit a broken behavior.
- Do not replace challenge requirements with simplified test doubles where that hides real behavior.
- Keep tests focused on critical flows, transport mapping, and brittle edge cases.

## Test Run Documentation

- Test run instructions must exist both in this project guidance and in `README.md`.
- A change that adds or changes behavior should update the relevant test coverage story.
