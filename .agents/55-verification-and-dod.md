# Verification And Definition Of Done

Read when: deciding whether a task is complete or preparing a summary of completed work.  
Priority: subordinate to `AGENTS.md` and `.agents/00-core.md`.  
Related: `.agents/50-testing.md`, `.agents/60-readme-submission.md`.

## Definition Of Done

A meaningful change is only done when the relevant verification has run.

Minimum expectation:

- lint
- typecheck
- relevant unit tests
- build
- smoke e2e when the touched scope includes a user flow

## Completion Rules

- Do not claim behavior works unless it was actually verified.
- If an expected check was not run, state that directly and briefly.
- If the approved scope is still partial, say so plainly and list what remains.

## Summary Rules

When reporting completion:

- say what changed
- say which files were touched
- say what was verified
- mention a blocker only if it is real and current
