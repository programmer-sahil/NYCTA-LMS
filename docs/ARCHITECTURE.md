# Architecture

## Overview

NYCTA LMS is a pnpm workspace monorepo. Applications are independently runnable while shared platform-neutral TypeScript contracts live in one package.

```text
Browser -> Next.js web application -> Express API -> MongoDB
                    |                    |
                    +--- @nycta/shared --+
```

MongoDB is the persistence layer for the API foundation. Mongoose models, indexes, environment validation, idempotent development seeding, and graceful connection shutdown are active. Public reads currently use the database; authentication and protected writes remain future work.

## Workspace units

### `apps/web`

The user-facing Next.js application uses the App Router, React, strict TypeScript, Tailwind CSS, ESLint, and a `src` directory. Routes live under `src/app`. The `@/*` alias resolves to `src/*`.

### `apps/api`

The HTTP service uses Express and strict TypeScript. `app.ts` configures the application independently of `server.ts`, so Supertest can exercise it without binding a network port. Helmet supplies security headers, CORS controls browser origins, express-rate-limit protects public endpoints, Pino emits structured logs, Zod validates requests and configuration, and all failures terminate at central middleware. API startup connects to MongoDB before accepting traffic and closes both HTTP and database connections on shutdown.

Domain code is grouped under `src/modules`: users, courses, modules, lessons, enrollments, progress, quizzes, and projects. Public course controllers coordinate the course, module, and lesson persistence models without exposing unpublished content.

### `packages/shared`

The shared package contains institute configuration and application-neutral contracts. It must not depend on either application. Its central `index.ts` is the only public export surface.

### `docs`

Product scope, architecture decisions, and route planning live here so implementation can evolve from an explicit brief.

## Dependency direction

- `apps/web` may depend on `@nycta/shared`.
- `apps/api` may depend on `@nycta/shared`.
- `packages/shared` must not depend on either application.
- The web application communicates with the API over HTTP; it does not access MongoDB directly.

The shared package remains the platform-neutral contract boundary. API-specific persistence shapes stay inside `apps/api`; contracts intended for both applications should be promoted to `packages/shared` through its central export surface.

## Configuration

Local configuration is documented in each application's `.env.example`. Secrets and machine-specific `.env` files are ignored by Git. The API currently provides safe development defaults while preserving explicit environment boundaries.

## Future scaling direction

Future API features should be grouped around domain modules with routes, validation, services, and persistence separated. Authentication and authorization must be enforced server-side. MongoDB collections should gain deliberate schemas, indexes, migrations or data-transition scripts, and repository/service boundaries only when those features enter scope.
