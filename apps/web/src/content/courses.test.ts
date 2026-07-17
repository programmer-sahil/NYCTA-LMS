import { describe, expect, it } from 'vitest'

import { isValidLessonData, publishedCourses } from './courses'

describe('lesson data validation', () => {
  const lesson = publishedCourses
    .find((course) => course.slug === 'data-analytics-genai')
    ?.modules.find((courseModule) => courseModule.slug === 'python-for-data-analytics')
    ?.lessons[0]

  it('accepts a valid lesson record', () => {
    expect(lesson).toBeDefined()
    expect(isValidLessonData(lesson)).toBe(true)
  })

  it('rejects unsafe or malformed lesson data', () => {
    expect(isValidLessonData({ ...lesson, slug: '../unsafe', estimatedMinutes: -1 })).toBe(false)
    expect(isValidLessonData(null)).toBe(false)
  })
})
