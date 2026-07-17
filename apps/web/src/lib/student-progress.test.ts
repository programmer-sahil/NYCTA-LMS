import { describe, expect, it } from 'vitest'

import { publishedCourses } from '../content/courses'
import { calculateCourseProgress } from './student-progress'

describe('calculateCourseProgress', () => {
  it('calculates progress from unique published lesson ids', () => {
    const course = publishedCourses.find(
      (item) => item.slug === 'data-analytics-genai',
    )
    expect(course).toBeDefined()

    const lessonIds = course?.modules.flatMap((courseModule) =>
      courseModule.lessons.map((lesson) => lesson.id),
    )
    expect(lessonIds).toHaveLength(5)
    expect(
      calculateCourseProgress(course!, [lessonIds![0]!, lessonIds![1]!]),
    ).toBe(40)
  })

  it('returns zero for a course without published lessons', () => {
    const course = publishedCourses.find(
      (item) => item.slug === 'java-using-ai',
    )
    expect(course).toBeDefined()
    expect(calculateCourseProgress(course!, [])).toBe(0)
  })
})
