# Architecture

## Overview

NYCTA LMS is a pnpm workspace monorepo. Applications are independently runnable while shared platform-neutral TypeScript contracts live in one package.

```text
Browser -> Next.js web application -> Express API -> MongoDB
                    |                    |
                    +--- @nycta/shared --+
```

MongoDB is the planned persistence layer. A Mongoose dependency and database connection utility establish the integration boundary, but no database connection or models are activated during this setup phase.

## Workspace units

### `apps/web`

The user-facing Next.js application uses the App Router, React, strict TypeScript, Tailwind CSS, ESLint, and a `src` directory. Routes live under `src/app`. The `@/*` alias resolves to `src/*`.

### `apps/api`

The HTTP service uses Express and strict TypeScript. `app.ts` creates and configures the Express application independently of `server.ts`, keeping future integration testing straightforward. Helmet supplies security headers, CORS controls browser origins, Morgan logs HTTP traffic, and errors terminate at central middleware. MongoDB configuration is represented by an environment variable and a reusable connection utility; startup does not require a database yet.

### `packages/shared`

The shared package contains institute configuration and application-neutral contracts. It must not depend on either application. Its central `index.ts` is the only public export surface.

### `docs`

Product scope, architecture decisions, and route planning live here so implementation can evolve from an explicit brief.

## Dependency direction

- `apps/web` may depend on `@nycta/shared`.
- `apps/api` may depend on `@nycta/shared`.
- `packages/shared` must not depend on either application.
- The web application communicates with the API over HTTP; it does not access MongoDB directly.

The shared package is not consumed by either app during this minimal phase. Future consumption should add it as a workspace dependency with `workspace:*`.

## Configuration

Local configuration is documented in each application's `.env.example`. Secrets and machine-specific `.env` files are ignored by Git. The API currently provides safe development defaults while preserving explicit environment boundaries.

## Future scaling direction

Future API features should be grouped around domain modules with routes, validation, services, and persistence separated. Authentication and authorization must be enforced server-side. MongoDB collections should gain deliberate schemas, indexes, migrations or data-transition scripts, and repository/service boundaries only when those features enter scope.
