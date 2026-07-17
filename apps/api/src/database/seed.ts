import {
  connectToDatabase,
  disconnectFromDatabase,
} from '../config/database.js'
import { env } from '../config/env.js'
import { logger } from '../config/logger.js'
import { seedDatabase } from './seed-service.js'

async function run(): Promise<void> {
  if (env.nodeEnv === 'production') {
    throw new Error('Development seed data cannot be run in production')
  }

  await connectToDatabase(env.mongoDbUri)
  const result = await seedDatabase()
  logger.info(
    result,
    'Development seed completed without deleting existing data',
  )
  await disconnectFromDatabase()
}

run().catch(async (error: unknown) => {
  logger.error({ error }, 'Development seed failed')
  await disconnectFromDatabase()
  process.exitCode = 1
})
