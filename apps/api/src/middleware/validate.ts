import type { RequestHandler } from 'express'
import { z, type ZodType } from 'zod'

import { AppError } from '../errors/app-error.js'

type RequestTarget = 'params' | 'query' | 'body'

export function validate(
  target: RequestTarget,
  schema: ZodType,
): RequestHandler {
  return (request, _response, next) => {
    const result = schema.safeParse(request[target])

    if (!result.success) {
      next(
        new AppError(
          'Request validation failed',
          400,
          'VALIDATION_ERROR',
          z.treeifyError(result.error),
        ),
      )
      return
    }

    Object.assign(request[target], result.data)
    next()
  }
}
