# NYCTA LMS API

## Overview

The Express API is served under `/api`. Public curriculum endpoints are read-only and return only courses, modules, and lessons whose `published` flag is `true`. Authentication and protected write endpoints are outside this phase.

Local base URL: `http://localhost:4000/api`

## Response format

Successful resource response:

```json
{
  "success": true,
  "data": {}
}
```

Paginated list response:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "pageSize": 12,
    "totalItems": 6,
    "totalPages": 1
  }
}
```

Error response:

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Course was not found"
  }
}
```

## Public endpoints

| Method | Route                                                              | Description                               |
| ------ | ------------------------------------------------------------------ | ----------------------------------------- |
| `GET`  | `/api/health`                                                      | Service health response                   |
| `GET`  | `/api/courses`                                                     | Published course catalogue                |
| `GET`  | `/api/courses/:courseSlug`                                         | Published course summary and module count |
| `GET`  | `/api/courses/:courseSlug/modules`                                 | Published modules for a course            |
| `GET`  | `/api/courses/:courseSlug/modules/:moduleSlug`                     | Module and published lesson summaries     |
| `GET`  | `/api/courses/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug` | Full published lesson record              |

`GET /api/courses` accepts:

- `page`: positive integer, default `1`
- `pageSize`: integer from `1` through `50`, default `12`
- `search`: optional text search over titles, summaries, and highlights

Example sample lesson:

```text
GET /api/courses/data-analytics-genai/modules/python-for-data-analytics/lessons/introduction-to-python
```

## Validation and security

- Route parameters and query strings are validated with Zod.
- Helmet supplies HTTP security headers.
- CORS origins come from the comma-separated `CORS_ORIGIN` variable.
- The global request limiter uses `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX`.
- Pino emits structured JSON logs and redacts authentication, cookie, and password fields.
- Unknown routes, validation failures, duplicate keys, invalid identifiers, and server errors use the central error envelope.

## Development data

The seed is idempotent: it inserts missing official courses, modules, and the five existing sample Python lessons with `$setOnInsert`. It does not delete or overwrite existing records.

```bash
pnpm --filter @nycta/api db:seed
```

The reset command is intentionally destructive and works only when `NODE_ENV=development`. It also requires an explicit confirmation flag:

```bash
pnpm --filter @nycta/api db:reset -- --confirm
```

Do not point the development reset command at a shared or production database.
