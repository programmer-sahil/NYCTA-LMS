import type { FilterQuery } from 'mongoose'

import { NotFoundError } from '../../errors/app-error.js'
import { getPagination, getTotalPages } from '../../utils/pagination.js'
import { LessonModel } from '../lessons/lesson.model.js'
import { CourseModuleModel } from '../modules/module.model.js'
import { CourseModel, type Course } from './course.model.js'

export interface CourseListInput {
  page?: unknown
  pageSize?: unknown
  search?: unknown
}

async function findPublishedCourse(courseSlug: string) {
  const course = await CourseModel.findOne({
    slug: courseSlug,
    published: true,
  })
    .lean()
    .exec()

  if (!course) {
    throw new NotFoundError('Course')
  }

  return course
}

export async function listPublishedCourses(input: CourseListInput) {
  const pagination = getPagination(input)
  const filter: FilterQuery<Course> = { published: true }
  const search = typeof input.search === 'string' ? input.search.trim() : ''

  if (search) {
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    filter.$or = [
      { title: { $regex: escapedSearch, $options: 'i' } },
      { shortDescription: { $regex: escapedSearch, $options: 'i' } },
      { highlights: { $regex: escapedSearch, $options: 'i' } },
    ]
  }

  const [courses, totalItems] = await Promise.all([
    CourseModel.find(filter)
      .sort({ order: 1, title: 1 })
      .skip(pagination.skip)
      .limit(pagination.pageSize)
      .lean()
      .exec(),
    CourseModel.countDocuments(filter).exec(),
  ])

  return {
    courses,
    meta: {
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalItems,
      totalPages: getTotalPages(totalItems, pagination.pageSize),
    },
  }
}

export async function getPublishedCourse(courseSlug: string) {
  const course = await findPublishedCourse(courseSlug)
  const moduleCount = await CourseModuleModel.countDocuments({
    courseId: course._id,
    published: true,
  }).exec()

  return { course, moduleCount }
}

export async function listPublishedModules(courseSlug: string) {
  const course = await findPublishedCourse(courseSlug)
  const modules = await CourseModuleModel.find({
    courseId: course._id,
    published: true,
  })
    .sort({ order: 1, title: 1 })
    .lean()
    .exec()

  return { course, modules }
}

export async function getPublishedModule(
  courseSlug: string,
  moduleSlug: string,
) {
  const course = await findPublishedCourse(courseSlug)
  const courseModule = await CourseModuleModel.findOne({
    courseId: course._id,
    slug: moduleSlug,
    published: true,
  })
    .lean()
    .exec()

  if (!courseModule) {
    throw new NotFoundError('Module')
  }

  const lessons = await LessonModel.find({
    courseId: course._id,
    moduleId: courseModule._id,
    published: true,
  })
    .select('title slug summary estimatedMinutes difficulty order published')
    .sort({ order: 1, title: 1 })
    .lean()
    .exec()

  return { course, module: courseModule, lessons }
}

export async function getPublishedLesson(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string,
) {
  const course = await findPublishedCourse(courseSlug)
  const courseModule = await CourseModuleModel.findOne({
    courseId: course._id,
    slug: moduleSlug,
    published: true,
  })
    .lean()
    .exec()

  if (!courseModule) {
    throw new NotFoundError('Module')
  }

  const lesson = await LessonModel.findOne({
    courseId: course._id,
    moduleId: courseModule._id,
    slug: lessonSlug,
    published: true,
  })
    .lean()
    .exec()

  if (!lesson) {
    throw new NotFoundError('Lesson')
  }

  return { course, module: courseModule, lesson }
}
