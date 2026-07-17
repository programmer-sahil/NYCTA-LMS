import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'

import { createApp } from '../src/app.js'
import {
  connectToDatabase,
  disconnectFromDatabase,
} from '../src/config/database.js'
import { seedDatabase } from '../src/database/seed-service.js'
import { CourseModel } from '../src/modules/courses/course.model.js'

interface ListResponse {
  success: boolean
  data: readonly { slug: string; published: boolean }[]
  meta: { totalItems: number; totalPages: number }
}

interface ModuleResponse {
  success: boolean
  data: {
    module: { slug: string }
    lessons: readonly { slug: string }[]
  }
}

interface CourseResponse {
  success: boolean
  data: { course: { slug: string }; moduleCount: number }
}

interface ModuleListResponse {
  success: boolean
  data: { course: { slug: string }; modules: readonly { slug: string }[] }
}

interface LessonResponse {
  success: boolean
  data: {
    course: { slug: string }
    module: { slug: string }
    lesson: { slug: string; overview: string }
  }
}

describe('public course API', () => {
  const app = createApp()
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await connectToDatabase(mongoServer.getUri('nycta_api_test'))
    await seedDatabase()
  }, 120_000)

  afterAll(async () => {
    await disconnectFromDatabase()
    await mongoServer.stop()
  })

  it('returns all six published official courses with pagination metadata', async () => {
    const response = await request(app).get('/api/courses').expect(200)
    const body = response.body as ListResponse

    expect(body.success).toBe(true)
    expect(body.data).toHaveLength(6)
    expect(body.meta).toMatchObject({ totalItems: 6, totalPages: 1 })
    expect(body.data.every((course) => course.published)).toBe(true)
  })

  it('supports course search', async () => {
    const response = await request(app)
      .get('/api/courses?search=Python')
      .expect(200)
    const body = response.body as ListResponse

    expect(body.data.map((course) => course.slug)).toContain('python-using-ai')
  })

  it('returns a course overview and its ordered module list', async () => {
    const courseResponse = await request(app)
      .get('/api/courses/data-analytics-genai')
      .expect(200)
    const moduleResponse = await request(app)
      .get('/api/courses/data-analytics-genai/modules')
      .expect(200)
    const courseBody = courseResponse.body as CourseResponse
    const moduleBody = moduleResponse.body as ModuleListResponse

    expect(courseBody.data).toMatchObject({
      course: { slug: 'data-analytics-genai' },
      moduleCount: 12,
    })
    expect(moduleBody.data.course.slug).toBe('data-analytics-genai')
    expect(moduleBody.data.modules).toHaveLength(12)
    expect(moduleBody.data.modules[1]?.slug).toBe('python-for-data-analytics')
    expect(moduleBody.data.modules[2]?.slug).toBe('numpy')
  })

  it('returns the sample module and its five lessons', async () => {
    const response = await request(app)
      .get(
        '/api/courses/data-analytics-genai/modules/python-for-data-analytics',
      )
      .expect(200)
    const body = response.body as ModuleResponse

    expect(body.data.module.slug).toBe('python-for-data-analytics')
    expect(body.data.lessons).toHaveLength(5)
  })

  it('returns the required sample lesson hierarchy', async () => {
    const response = await request(app)
      .get(
        '/api/courses/data-analytics-genai/modules/python-for-data-analytics/lessons/introduction-to-python',
      )
      .expect(200)
    const body = response.body as LessonResponse

    expect(body.data.course.slug).toBe('data-analytics-genai')
    expect(body.data.module.slug).toBe('python-for-data-analytics')
    expect(body.data.lesson.slug).toBe('introduction-to-python')
    expect(body.data.lesson.overview).toBe(
      'Lesson content will be added by the instructor.',
    )
  })

  it('does not expose unpublished courses', async () => {
    await CourseModel.create({
      title: 'Draft course',
      slug: 'draft-course',
      shortDescription: 'Draft content',
      description: 'Draft content',
      theme: 'cyan',
      icon: 'draft',
      level: 'beginner',
      learningMode: 'hybrid',
      highlights: [],
      published: false,
      order: 100,
    })

    await request(app).get('/api/courses/draft-course').expect(404)
    await CourseModel.deleteOne({ slug: 'draft-course' })
  })

  it('returns structured validation and not-found errors', async () => {
    const invalid = await request(app).get('/api/courses/INVALID!').expect(400)
    const missing = await request(app)
      .get('/api/courses/does-not-exist')
      .expect(404)

    expect(invalid.body).toMatchObject({
      success: false,
      error: { code: 'VALIDATION_ERROR' },
    })
    expect(missing.body).toMatchObject({
      success: false,
      error: { code: 'NOT_FOUND' },
    })
  })

  it('seeds idempotently without duplicating existing records', async () => {
    await seedDatabase()

    expect(await CourseModel.countDocuments()).toBe(6)
  })
})
