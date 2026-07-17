# NYCTA LMS

Learning Management System for the **National Youth Computer Training Center (NYCTA)**, serving Bandel and Chandannagar in Hooghly, West Bengal. The platform supports hybrid classroom and online learning with recorded lessons, revision resources, practice, projects, and interview preparation.

The repository currently includes the public web learning experience and the backend/database foundation. Authentication UI, protected student workflows, and administration are intentionally not included yet.

## Architecture

- `apps/web`: Next.js App Router frontend with strict TypeScript and Tailwind CSS.
- `apps/api`: Express API with Mongoose, Zod, Helmet, CORS, rate limiting, Pino logging, and central errors.
- `packages/shared`: application-neutral institute configuration and TypeScript contracts.
- `docs`: product, architecture, route, and API documentation.
- MongoDB: course hierarchy and future LMS operational persistence.

See [Product Specification](docs/PRODUCT_SPEC.md), [Architecture](docs/ARCHITECTURE.md), [Routes](docs/ROUTES.md), and [API Reference](docs/API.md).

## Prerequisites

- Node.js 20.9 or newer
- pnpm 10 (Corepack recommended)
- MongoDB 7 locally, or Docker with Compose

```bash
corepack enable
corepack prepare pnpm@10.13.1 --activate
```

## Installation

```bash
pnpm install
```

## MongoDB setup

Start the provided local MongoDB container:

```bash
docker compose up -d mongodb
docker compose ps
```

To use an existing MongoDB installation instead, set `MONGODB_URI` to its connection string. Docker data is retained in the named `nycta_mongodb_data` volume.

## Environment setup

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

API variables:

| Variable               | Default purpose                        |
| ---------------------- | -------------------------------------- |
| `NODE_ENV`             | `development`, `test`, or `production` |
| `PORT`                 | API port, default `4000`               |
| `CORS_ORIGIN`          | Comma-separated allowed web origins    |
| `MONGODB_URI`          | MongoDB connection string              |
| `LOG_LEVEL`            | Pino log level                         |
| `RATE_LIMIT_WINDOW_MS` | Global limiter window                  |
| `RATE_LIMIT_MAX`       | Requests allowed per window and client |

## Database commands

Seed the six official courses, their modules, and the existing five sample lessons. Seeding is idempotent and never removes or overwrites existing records.

```bash
pnpm --filter @nycta/api db:seed
```

Reset is restricted to development and requires explicit confirmation. It deletes API collections and should only target a disposable local database.

```bash
pnpm --filter @nycta/api db:reset -- --confirm
```

## Development and verification commands

```bash
pnpm dev          # Run web and API together
pnpm dev:web      # Run only Next.js
pnpm dev:api      # Run only Express with tsx watch mode
pnpm test         # Run workspace tests
pnpm lint         # Lint every workspace package
pnpm typecheck    # Type-check every workspace package
pnpm build        # Build every workspace package
pnpm format       # Format with Prettier
```

After MongoDB is running and the database is seeded, start development and open:

- Web: `http://localhost:3000`
- API health: `http://localhost:4000/api/health`
- Course API: `http://localhost:4000/api/courses`
- Sample lesson API: `http://localhost:4000/api/courses/data-analytics-genai/modules/python-for-data-analytics/lessons/introduction-to-python`

## Folder structure

```text
nycta-lms/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── database/
│   │   │   ├── errors/
│   │   │   ├── middleware/
│   │   │   ├── modules/
│   │   │   ├── routes/
│   │   │   └── utils/
│   │   └── tests/
│   └── web/
│       └── src/
├── docs/
├── packages/shared/
├── AGENTS.md
├── docker-compose.yml
├── package.json
└── pnpm-workspace.yaml
```
