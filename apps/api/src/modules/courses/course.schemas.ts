import { z } from 'zod'

import { paginationQuerySchema } from '../../utils/pagination.js'

const slug = z
  .string()
  .min(1)
  .max(180)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Must be a valid slug')

export const courseListQuerySchema = paginationQuerySchema.extend({
  search: z.string().trim().max(120).optional(),
})

export const courseParamsSchema = z.object({ courseSlug: slug })
export const moduleParamsSchema = courseParamsSchema.extend({
  moduleSlug: slug,
})
export const lessonParamsSchema = moduleParamsSchema.extend({
  lessonSlug: slug,
})
