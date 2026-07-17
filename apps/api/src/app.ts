import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { env } from './config/env.js'
import { errorHandler } from './middleware/error-handler.js'
import { healthRouter } from './routes/health.js'

export const createApp = (): express.Express => {
  const app = express()

  app.disable('x-powered-by')
  app.use(helmet())
  app.use(cors({ origin: env.corsOrigin }))
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'))
  app.use(express.json())

  app.use('/api/health', healthRouter)
  app.use(errorHandler)

  return app
}
