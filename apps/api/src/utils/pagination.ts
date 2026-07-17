import { z } from 'zod'

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(12),
})

export interface Pagination {
  page: number
  pageSize: number
  skip: number
}

export function getPagination(input: unknown): Pagination {
  const { page, pageSize } = paginationQuerySchema.parse(input)
  return { page, pageSize, skip: (page - 1) * pageSize }
}

export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize)
}
