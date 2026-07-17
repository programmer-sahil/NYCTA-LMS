import pino from 'pino'

import { env } from './env.js'

export const logger = pino({
  level: env.logLevel,
  base: {
    service: 'nycta-lms-api',
    environment: env.nodeEnv,
  },
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'password',
      'passwordHash',
    ],
    censor: '[REDACTED]',
  },
})
