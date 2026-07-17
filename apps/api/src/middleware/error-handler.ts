import type { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import { z, ZodError } from 'zod'

import { env } from '../config/env.js'
import { logger } from '../config/logger.js'
import { AppError } from '../errors/app-error.js'

function isDuplicateKeyError(error: unknown): error is { code: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11_000
  )
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  request,
  response,
  _next,
) => {
  void _next

  let statusCode = 500
  let code = 'INTERNAL_SERVER_ERROR'
  let message = 'An unexpected error occurred'
  let details: unknown

  if (error instanceof AppError) {
    statusCode = error.statusCode
    code = error.code
    message = error.message
    details = error.details
  } else if (error instanceof ZodError) {
    statusCode = 400
    code = 'VALIDATION_ERROR'
    message = 'Request validation failed'
    details = z.treeifyError(error)
  } else if (error instanceof mongoose.Error.CastError) {
    statusCode = 400
    code = 'INVALID_IDENTIFIER'
    message = 'A supplied identifier is invalid'
  } else if (isDuplicateKeyError(error)) {
    statusCode = 409
    code = 'DUPLICATE_RESOURCE'
    message = 'A resource with this unique value already exists'
  }

  const logContext = {
    error,
    requestId: request.id,
    method: request.method,
    path: request.originalUrl,
    statusCode,
  }

  if (statusCode >= 500) {
    logger.error(logContext, 'Request failed')
  } else {
    logger.warn(logContext, 'Request rejected')
  }

  const errorBody: Record<string, unknown> = { code, message }
  if (details !== undefined) {
    errorBody.details = details
  }
  if (
    env.nodeEnv === 'development' &&
    statusCode >= 500 &&
    error instanceof Error
  ) {
    errorBody.debugMessage = error.message
  }

  response.status(statusCode).json({ success: false, error: errorBody })
}
