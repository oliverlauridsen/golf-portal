# Golf Portal

A React application for creating, editing, viewing, and deleting golf courses. Course data is stored locally in the browser, and the interface follows the supplied Trackman Facility Portal designs.

## Setup

The project uses Node.js 22.

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm test
npm run lint
npm run build
```

## Technical approach

- React 19, strict TypeScript, Vite, and Tailwind CSS v4
- React Router with route-level code splitting
- React Query for queries, mutations, cache invalidation, and optimistic deletion
- React Hook Form and Zod for form and runtime data validation
- A localStorage-backed service layer with simulated latency
- Vitest coverage for featured ordering and Zod validation

The service layer owns browser storage access, which keeps the UI and React Query hooks independent of the current mock implementation. Replacing it with HTTP requests should therefore be contained to that layer.

## Assumptions and tradeoffs

- Course records persist in localStorage.
- Uploaded images use object URLs and are session-only, as permitted by the brief. Course information persists after refresh, but a newly uploaded image may fall back to the placeholder after a full reload.
- The first attempt to delete **Hidden Canyon** intentionally fails. This makes the optimistic removal, rollback, and visible error state easy to review; retrying succeeds.
- The custom select fields cover the required pointer and keyboard interactions without introducing another component dependency.
- The supplied design is treated as the visual reference, with intermediate responsive breakpoints chosen to keep the layouts practical.

## AI usage

I used OpenAI Codex as a collaborative pair-programming and review tool. It supported architectural discussions, translating the brief and designs into scoped implementation tasks, and reviewing the UI, data layer, validation, and tests. I retained ownership of the technical decisions, adjusted suggestions to keep the solution appropriate for the assignment, and verified the result with TypeScript, ESLint, Vitest, production builds, and manual browser checks.

## What I would improve with more time

I treated the assignment as a focused six-hour implementation window and prioritized a robust core flow, explicit error handling, and an architecture that is easy to read, test, and adapt to a real API. With more time, I would:

- Enhance perceived performance with skeleton states and more granular mutation feedback.
- Complete a pixel-perfect visual pass across every breakpoint and browser.
- Align with the designer or product owner on how the course description should be presented outside the editor, since no corresponding detail view is included in the prototype.
- Extend automated coverage with Playwright for a core create/edit flow and integration coverage for optimistic rollback.
- Run a dedicated accessibility audit with screen readers and additional browser combinations.
