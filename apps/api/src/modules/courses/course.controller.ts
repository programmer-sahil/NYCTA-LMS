import type { RequestHandler } from 'express'

import { sendSuccess } from '../../utils/api-response.js'
import {
  getPublishedCourse,
  getPublishedLesson,
  getPublishedModule,
  listPublishedCourses,
  listPublishedModules,
} from './course.service.js'

function getParam(value: string | string[] | undefined): string {
  return typeof value === 'string' ? value : ''
}

export const listCourses: RequestHandler = async (request, response) => {
  const result = await listPublishedCourses(request.query)
  sendSuccess(response, result.courses, { meta: result.meta })
}

export const getCourse: RequestHandler = async (request, response) => {
  sendSuccess(
    response,
    await getPublishedCourse(getParam(request.params.courseSlug)),
  )
}

export const listCourseModules: RequestHandler = async (request, response) => {
  sendSuccess(
    response,
    await listPublishedModules(getParam(request.params.courseSlug)),
  )
}

export const getCourseModule: RequestHandler = async (request, response) => {
  sendSuccess(
    response,
    await getPublishedModule(
      getParam(request.params.courseSlug),
      getParam(request.params.moduleSlug),
    ),
  )
}

export const getCourseLesson: RequestHandler = async (request, response) => {
  sendSuccess(
    response,
    await getPublishedLesson(
      getParam(request.params.courseSlug),
      getParam(request.params.moduleSlug),
      getParam(request.params.lessonSlug),
    ),
  )
}
