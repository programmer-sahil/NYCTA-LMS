import { Router } from 'express'

import { validate } from '../../middleware/validate.js'
import {
  getCourse,
  getCourseLesson,
  getCourseModule,
  listCourseModules,
  listCourses,
} from './course.controller.js'
import {
  courseListQuerySchema,
  courseParamsSchema,
  lessonParamsSchema,
  moduleParamsSchema,
} from './course.schemas.js'

export const courseRouter = Router()

courseRouter.get('/', validate('query', courseListQuerySchema), listCourses)
courseRouter.get(
  '/:courseSlug',
  validate('params', courseParamsSchema),
  getCourse,
)
courseRouter.get(
  '/:courseSlug/modules',
  validate('params', courseParamsSchema),
  listCourseModules,
)
courseRouter.get(
  '/:courseSlug/modules/:moduleSlug',
  validate('params', moduleParamsSchema),
  getCourseModule,
)
courseRouter.get(
  '/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug',
  validate('params', lessonParamsSchema),
  getCourseLesson,
)
