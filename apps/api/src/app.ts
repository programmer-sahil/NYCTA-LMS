import cors from 'cors'
import express from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import { pinoHttp } from 'pino-http'

import { env } from './config/env.js'
import { logger } from './config/logger.js'
import { errorHandler } from './middleware/error-handler.js'
import { notFoundHandler } from './middleware/not-found.js'
import { courseRouter } from './modules/courses/course.routes.js'
import { healthRouter } from './routes/health.js'

export function createApp(): express.Express {
  const app = express()

  app.disable('x-powered-by')
  app.set('trust proxy', 1)
  app.use(
    pinoHttp({
      logger,
      autoLogging: {
        ignore: (request) => request.url === '/api/health',
      },
    }),
  )
  app.use(helmet())
  app.use(cors({ origin: [...env.corsOrigins] }))
  app.use(
    rateLimit({
      windowMs: env.rateLimitWindowMs,
      limit: env.rateLimitMax,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      handler: (_request, response) => {
        response.status(429).json({
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests. Please try again later.',
          },
        })
      },
    }),
  )
  app.use(express.json({ limit: '1mb' }))

  app.use('/api/health', healthRouter)
  app.use('/api/courses', courseRouter)
  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
