# AGENTS.md

## Scope

These conventions apply to the entire NYCTA LMS monorepo. More specific `AGENTS.md` files may refine them for a subdirectory in the future.

## Working conventions

- Use pnpm workspace commands from the repository root.
- Keep the web, API, and shared package boundaries explicit. Do not import application code across `apps/`.
- Put reusable, platform-neutral contracts in `packages/shared`.
- Implement only the requested product phase. Do not add speculative screens, endpoints, models, or dependencies.
- Keep institute identity and public contact details in configuration or documented content rather than scattering literals through components.

## TypeScript

- Keep `strict` mode enabled and do not use `any`.
- Prefer `unknown` at trust boundaries and narrow it before use.
- Export explicit interfaces or types for shared contracts.
- Use type-only imports when a symbol is not needed at runtime.
- Validate all future request payloads and environment variables at application boundaries.

## Frontend

- Use the Next.js App Router under `apps/web/src/app`.
- Prefer Server Components; add `use client` only for browser APIs or interactive state.
- Keep route files small and move reusable UI into clearly named components.
- Use semantic HTML and preserve keyboard and screen-reader accessibility.
- Use the `@/*` alias for imports rooted at `apps/web/src`.

## Backend

- Keep Express application creation separate from server startup for testability.
- Organize future features by route, controller, service, validation, and persistence responsibilities.
- Pass errors to the central error middleware and avoid leaking stack traces in production.
- Keep secrets out of source control; document required values in `.env.example`.
- Add MongoDB indexes and validation deliberately when persistence models are introduced.

## Quality checks

- Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` before handing off changes.
- Add tests alongside future behavior changes and cover both success and failure paths.
- Format changes with `pnpm format`.
