# ADR 0002: Vendored Proto And Typed BFF Contract

## Status

Accepted.

## Context

The backend is contract-first and exposes its auth API through protobuf definitions. The challenge values typed contract strategy, real backend integration, and clear assumptions.

## Decision

- Vendor the selected backend proto into the frontend repository.
- Generate TypeScript client code from the vendored proto.
- Keep protobuf types inside the server boundary.
- Expose browser-facing JSON contracts through the BFF layer instead of leaking protobuf-generated shapes into UI code.

## Consequences

Positive:

- stable and reviewable contract snapshot
- typed client generation
- easier documentation of assumptions and backend pinning
- lower risk of browser/UI coupling to transport details

Negative:

- requires a codegen lifecycle
- requires keeping the pinned backend commit current

## Alternatives Rejected

- Handwritten wrappers only: rejected because they weaken the typed contract signal and drift more easily.
- Importing protobuf types directly into browser code: rejected because it couples UI to transport concerns.
- Treating backend behavior as undocumented implementation detail: rejected because the challenge explicitly asks for documented assumptions.
