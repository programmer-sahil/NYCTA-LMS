import mongoose from 'mongoose'

import { logger } from './logger.js'

export async function connectToDatabase(uri: string): Promise<void> {
  if (mongoose.connection.readyState === mongoose.ConnectionStates.connected) {
    return
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10_000,
  })
  logger.info({ database: mongoose.connection.name }, 'MongoDB connected')
}

export async function disconnectFromDatabase(): Promise<void> {
  if (
    mongoose.connection.readyState === mongoose.ConnectionStates.disconnected
  ) {
    return
  }

  await mongoose.disconnect()
  logger.info('MongoDB disconnected')
}
