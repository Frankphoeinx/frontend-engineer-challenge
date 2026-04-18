# README And Submission

Read when: editing `README.md`, preparing the handoff, or checking challenge completeness.  
Priority: subordinate to `AGENTS.md` and `.agents/00-core.md`.  
Related: `.agents/35-backend-contract-assumptions.md`, `.agents/50-testing.md`, `.agents/65-observability.md`.

## Required README Sections

- how to run the project
- selected backend fork link
- pinned backend commit
- frontend architecture overview
- contract assumptions
- accepted trade-offs
- test run instructions
- next production steps

## Required README Artifacts

- a short architecture diagram
- a contract assumptions table
- a trade-offs table
- a reviewer demo script
- an explanation of the reset flow via backend logs
- a demo link or screencast if one exists

## README Writing Rules

- Treat `README.md` as a living project document, not final-stage polish.
- Update `README.md` in the same change when implementation decisions materially affect setup, architecture, contracts, UX-relevant behavior, limitations, or trade-offs.
- Do not postpone decision documentation until submission prep if the decision already affects the current implementation.
- Explain decisions through concrete trade-offs.
- Do not write abstract filler.
- Explicitly explain the choice of `Next.js`, `BFF`, `Buf codegen`, `CSS Modules`, and no global store.
- Keep setup and test instructions explicit enough that a reviewer can follow them without guessing.

## Submission Rules

Before sending the challenge result, confirm:

- the frontend fork link is ready
- the chosen backend fork link is present in `README.md`
- test instructions are present
- `.agents/` is included in the repository
