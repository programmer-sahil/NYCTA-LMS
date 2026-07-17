import type { Course } from '@/content/courses'

const storageKey = 'nycta.student-progress.v1'
const updateEventName = 'nycta:student-progress-updated'

export interface QuizAttempt {
  lessonId: string
  correct: number
  total: number
  percentage: number
  completedAt: string
}

interface StoredProgress {
  completedLessons: readonly string[]
  quizAttempts: readonly QuizAttempt[]
}

export interface StudentProgressService {
  getCompletedLessons(): readonly string[]
  markLessonComplete(lessonId: string): void
  unmarkLessonComplete(lessonId: string): void
  saveQuizAttempt(attempt: QuizAttempt): void
  getQuizAttempts(lessonId?: string): readonly QuizAttempt[]
  calculateCourseProgress(course: Course): number
  subscribe(listener: () => void): () => void
}

const emptyProgress: StoredProgress = {
  completedLessons: [],
  quizAttempts: [],
}

function isQuizAttempt(value: unknown): value is QuizAttempt {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  const attempt = value as Record<string, unknown>
  return (
    typeof attempt.lessonId === 'string' &&
    typeof attempt.correct === 'number' &&
    typeof attempt.total === 'number' &&
    typeof attempt.percentage === 'number' &&
    typeof attempt.completedAt === 'string'
  )
}

function parseProgress(value: string | null): StoredProgress {
  if (!value) return emptyProgress

  try {
    const parsed: unknown = JSON.parse(value)
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return emptyProgress
    }

    const record = parsed as Record<string, unknown>
    if (
      !Array.isArray(record.completedLessons) ||
      !record.completedLessons.every((item) => typeof item === 'string') ||
      !Array.isArray(record.quizAttempts) ||
      !record.quizAttempts.every(isQuizAttempt)
    ) {
      return emptyProgress
    }

    return {
      completedLessons: [...new Set(record.completedLessons)],
      quizAttempts: record.quizAttempts,
    }
  } catch {
    return emptyProgress
  }
}

function readProgress() {
  if (typeof window === 'undefined') return emptyProgress

  try {
    return parseProgress(window.localStorage.getItem(storageKey))
  } catch {
    return emptyProgress
  }
}

function writeProgress(progress: StoredProgress) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(progress))
    window.dispatchEvent(new Event(updateEventName))
  } catch {
    return
  }
}

export function calculateCourseProgress(
  course: Course,
  completedLessonIds: readonly string[],
) {
  const publishedLessonIds = course.modules.flatMap((courseModule) =>
    courseModule.lessons
      .filter((lesson) => courseModule.published && lesson.published)
      .map((lesson) => lesson.id),
  )

  if (publishedLessonIds.length === 0) return 0

  const completed = new Set(completedLessonIds)
  const completedCount = publishedLessonIds.filter((id) =>
    completed.has(id),
  ).length
  return Math.round((completedCount / publishedLessonIds.length) * 100)
}

export const localStudentProgressService: StudentProgressService = {
  getCompletedLessons() {
    return readProgress().completedLessons
  },
  markLessonComplete(lessonId) {
    const progress = readProgress()
    writeProgress({
      ...progress,
      completedLessons: [...new Set([...progress.completedLessons, lessonId])],
    })
  },
  unmarkLessonComplete(lessonId) {
    const progress = readProgress()
    writeProgress({
      ...progress,
      completedLessons: progress.completedLessons.filter(
        (id) => id !== lessonId,
      ),
    })
  },
  saveQuizAttempt(attempt) {
    const progress = readProgress()
    writeProgress({
      ...progress,
      quizAttempts: [...progress.quizAttempts, attempt],
    })
  },
  getQuizAttempts(lessonId) {
    const attempts = readProgress().quizAttempts
    return lessonId
      ? attempts.filter((attempt) => attempt.lessonId === lessonId)
      : attempts
  },
  calculateCourseProgress(course) {
    return calculateCourseProgress(course, readProgress().completedLessons)
  },
  subscribe(listener) {
    if (typeof window === 'undefined') return () => undefined

    const handleUpdate = () => listener()
    window.addEventListener('storage', handleUpdate)
    window.addEventListener(updateEventName, handleUpdate)

    return () => {
      window.removeEventListener('storage', handleUpdate)
      window.removeEventListener(updateEventName, handleUpdate)
    }
  },
}
