# NYCTA LMS

Initial monorepo foundation for the **National Youth Computer Training Center (NYCTA)** Learning Management System, serving Bandel and Chandannagar in Hooghly, West Bengal. The planned platform supports NYCTA's hybrid learning model with classroom teaching, recorded videos, revision resources, practice, projects, and interview preparation.

This phase intentionally includes infrastructure only. It does not include the final landing page, authentication, dashboards, administration, or course lesson features.

## Architecture

- `apps/web`: Next.js App Router frontend with TypeScript and Tailwind CSS.
- `apps/api`: Express API with TypeScript, security middleware, logging, environment configuration, and a health route.
- `packages/shared`: shared institute configuration and TypeScript contracts.
- `docs`: product, architecture, and route planning documentation.
- MongoDB/Mongoose: persistence foundation for future phases; no models or required startup connection yet.

See [Product Specification](docs/PRODUCT_SPEC.md), [Architecture](docs/ARCHITECTURE.md), and [Planned Routes](docs/ROUTES.md).

## Prerequisites

- Node.js 20.9 or newer
- pnpm 10 (Corepack is recommended)
- MongoDB will be required when persistence is implemented; it is not required for the current health endpoint.

Enable the package manager if pnpm is not already available:

```bash
corepack enable
corepack prepare pnpm@10.13.1 --activate
```

## Installation

From the repository root:

```bash
pnpm install
```

## Environment setup

Copy the example environment files:

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

The default web URL is `http://localhost:3000`. The default API URL is `http://localhost:4000`, and CORS permits the default web origin.

## Development commands

```bash
pnpm dev          # Run web and API together
pnpm dev:web      # Run only Next.js
pnpm dev:api      # Run only Express with tsx watch mode
pnpm lint         # Lint every workspace package
pnpm typecheck    # Type-check every workspace package
pnpm build        # Build every workspace package
pnpm format       # Format the repository with Prettier
```

After `pnpm dev`, open:

- Web: `http://localhost:3000`
- API health: `http://localhost:4000/api/health`

## Folder structure

```text
nycta-lms/
├── apps/
│   ├── api/
│   │   └── src/
│   │       ├── config/
│   │       ├── middleware/
│   │       └── routes/
│   └── web/
│       └── src/app/
├── docs/
├── packages/
│   └── shared/
│       └── src/
├── AGENTS.md
├── package.json
├── pnpm-workspace.yaml
└── README.md
```
