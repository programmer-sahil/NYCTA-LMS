import type { Server } from 'node:http'

import { createApp } from './app.js'
import { connectToDatabase, disconnectFromDatabase } from './config/database.js'
import { env } from './config/env.js'
import { logger } from './config/logger.js'

let server: Server | undefined
let shuttingDown = false

async function shutdown(signal: string, exitCode = 0): Promise<void> {
  if (shuttingDown) {
    return
  }
  shuttingDown = true
  logger.info({ signal }, 'Graceful shutdown started')

  if (server) {
    await new Promise<void>((resolve, reject) => {
      server?.close((error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  }

  await disconnectFromDatabase()
  logger.info('Graceful shutdown complete')
  process.exit(exitCode)
}

async function start(): Promise<void> {
  await connectToDatabase(env.mongoDbUri)
  const app = createApp()
  server = app.listen(env.port, () => {
    logger.info({ port: env.port }, 'NYCTA LMS API listening')
  })
}

process.once('SIGINT', () => void shutdown('SIGINT'))
process.once('SIGTERM', () => void shutdown('SIGTERM'))
process.once('uncaughtException', (error) => {
  logger.fatal({ error }, 'Uncaught exception')
  void shutdown('uncaughtException', 1)
})
process.once('unhandledRejection', (error) => {
  logger.fatal({ error }, 'Unhandled rejection')
  void shutdown('unhandledRejection', 1)
})

start().catch((error: unknown) => {
  logger.fatal({ error }, 'API startup failed')
  void shutdown('startupFailure', 1)
})
