# Code Review Rules

## General
- Keep changes minimal, focused, and easy to review.
- Prefer clear naming and small, composable functions.
- Avoid broad refactors unless explicitly requested.

## TypeScript
- Use `const`/`let`, never `var`.
- Prefer explicit types at module boundaries.
- Avoid `any`; use concrete interfaces/types.

## React / Next.js
- Use functional components.
- Keep server/client boundaries explicit.
- Use accessibility best practices (`label`, `aria-*`, semantic headings).

## Quality
- Ensure type-check passes before submitting.
- Keep lint warnings/errors from touched files under control.
