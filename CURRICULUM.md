# Curriculum & Branching Strategy

## Scope
This bootcamp is **frontend-only**. We intentionally exclude backend APIs, database modeling, and Node.js business logic. A separate Node.js bootcamp will build on this project later.

## Branching Strategy
- **Source of Truth**: `main`
- **Topic Branches**: `topic/{number}-{topic-name}-main`
- **Linear Checkpoint Flow**: each topic branch is a stable checkpoint in the learning path.
- **Workflow**:
  1. Start from the previous topic checkpoint branch.
  2. Implement only the current module's outcomes.
  3. Open PR to `main` when module checkpoint is complete.

## Curriculum Checkpoints

| Order | Branch | Learning Objectives | Deliverables (Checkpoint Output) |
|------:|--------|---------------------|----------------------------------|
| 01 | `topic/01-intro-main` | Understand project setup, Next.js app structure, and bootcamp scope. | Project scaffold with TypeScript, Tailwind, ESLint, and baseline docs. |
| 02 | `topic/02-routing-basics-main` | Learn App Router fundamentals and route composition. | App shell, sidebar navigation, section routes, and root redirect to `/overview`. |
| 03 | `topic/03-rendering-strategies-main` | Compare CSR, SSR, and static rendering tradeoffs in Next.js. | Route-level examples demonstrating rendering strategy choices for finance UI sections. |
| 04 | `topic/04-data-fetching-patterns-main` | Apply frontend-focused data-fetching patterns with local/mock data. | Reusable fetch abstractions, loading/empty/error states, and mock-driven page wiring. |
| 05 | `topic/05-caching-revalidation-main` | Understand caching boundaries and revalidation concepts for UI freshness. | Demonstrations of cache behavior, revalidation triggers, and stale-data UX handling. |
| 06 | `topic/06-server-actions-frontend-main` | Use Server Actions as frontend integration seams (without backend domain logic). | Form flows and mutations wired to temporary/mock-safe action boundaries. |
| 07 | `topic/07-runtime-node-edge-main` | Explain Node vs Edge runtime constraints and when to pick each. | Runtime-aware examples and notes showing practical tradeoffs for frontend workloads. |
| 08 | `topic/08-writing-css-main` | Establish scalable styling strategy and component visual consistency. | Shared design tokens, component styling conventions, and responsive layout refinements. |
| 09 | `topic/09-optimizations-main` | Optimize frontend performance and delivery quality. | Improvements for images/fonts/metadata/lazy-loading and measured UX/perf wins. |
| 10 | `topic/10-testing-main` | Build confidence with frontend testing strategy (unit + e2e). | Baseline tests for routing, navigation behavior, and critical UI flows. |
| 11 | `topic/11-deployment-main` | Prepare frontend app for production deployment and handoff. | Deployment-ready config, environment guidance, and release checklist for bootcamp use. |

## Current Progress
- ✅ `topic/01-intro-main`
- ✅ `topic/02-routing-basics-main`
- ⏳ `topic/03-rendering-strategies-main` to `topic/11-deployment-main`
