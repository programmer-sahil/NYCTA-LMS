import type { Response } from 'express'

export interface PaginationMeta {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export function sendSuccess(
  response: Response,
  data: unknown,
  options: { statusCode?: number; meta?: PaginationMeta } = {},
): Response {
  const body = options.meta
    ? { success: true as const, data, meta: options.meta }
    : { success: true as const, data }

  return response.status(options.statusCode ?? 200).json(body)
}
