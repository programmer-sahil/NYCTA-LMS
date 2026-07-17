import mongoose from 'mongoose'

export const connectToDatabase = async (uri: string): Promise<void> => {
  await mongoose.connect(uri)
}

export const disconnectFromDatabase = async (): Promise<void> => {
  await mongoose.disconnect()
}
