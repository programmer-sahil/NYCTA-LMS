import 'dotenv/config'

import { z } from 'zod'

const mongoUriSchema = z
  .string()
  .min(1)
  .refine(
    (value) =>
      value.startsWith('mongodb://') || value.startsWith('mongodb+srv://'),
    'MONGODB_URI must be a MongoDB connection string',
  )

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65_535).default(4000),
  CORS_ORIGIN: z.string().min(1).default('http://localhost:3000'),
  MONGODB_URI: mongoUriSchema.default('mongodb://127.0.0.1:27017/nycta_lms'),
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
    .default('info'),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900_000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(200),
})

export type Environment = Readonly<{
  nodeEnv: z.infer<typeof environmentSchema>['NODE_ENV']
  port: number
  corsOrigins: readonly string[]
  mongoDbUri: string
  logLevel: z.infer<typeof environmentSchema>['LOG_LEVEL']
  rateLimitWindowMs: number
  rateLimitMax: number
}>

export function loadEnvironment(
  source: NodeJS.ProcessEnv = process.env,
): Environment {
  const parsed = environmentSchema.safeParse(source)

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ')
    throw new Error(`Invalid environment configuration: ${details}`)
  }

  return Object.freeze({
    nodeEnv: parsed.data.NODE_ENV,
    port: parsed.data.PORT,
    corsOrigins: parsed.data.CORS_ORIGIN.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
    mongoDbUri: parsed.data.MONGODB_URI,
    logLevel: parsed.data.LOG_LEVEL,
    rateLimitWindowMs: parsed.data.RATE_LIMIT_WINDOW_MS,
    rateLimitMax: parsed.data.RATE_LIMIT_MAX,
  })
}

export const env = loadEnvironment()
