import 'dotenv/config'

const parsePort = (value: string | undefined): number => {
  const port = Number(value ?? '4000')

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('PORT must be an integer between 1 and 65535')
  }

  return port
}

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parsePort(process.env.PORT),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  mongoDbUri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/nycta_lms',
})
