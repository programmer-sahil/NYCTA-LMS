import type { QuizQuestion } from '@/content/courses'

export interface QuizScore {
  correct: number
  total: number
  percentage: number
}

export interface QuizSession {
  currentQuestion: number
  answers: Record<string, number>
}

const quizUpdateEvent = 'nycta:quiz-session-updated'

export function scoreQuiz(
  questions: readonly QuizQuestion[],
  answers: Readonly<Record<string, number>>,
): QuizScore {
  const correct = questions.reduce(
    (score, question) =>
      score + (answers[question.id] === question.correctAnswerIndex ? 1 : 0),
    0,
  )
  const total = questions.length

  return {
    correct,
    total,
    percentage: total === 0 ? 0 : Math.round((correct / total) * 100),
  }
}

function sessionKey(lessonId: string) {
  return `nycta.quiz-session.v1.${lessonId}`
}

export function parseQuizSession(value: string | null): QuizSession | null {
  try {
    if (!value) return null

    const parsed: unknown = JSON.parse(value)
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return null
    }

    const record = parsed as Record<string, unknown>
    if (
      typeof record.currentQuestion !== 'number' ||
      !Number.isInteger(record.currentQuestion) ||
      typeof record.answers !== 'object' ||
      record.answers === null ||
      Array.isArray(record.answers)
    ) {
      return null
    }

    const answerEntries = Object.entries(record.answers)
    if (!answerEntries.every(([, answer]) => Number.isInteger(answer))) {
      return null
    }

    return {
      currentQuestion: Math.max(0, record.currentQuestion),
      answers: Object.fromEntries(answerEntries) as Record<string, number>,
    }
  } catch {
    return null
  }
}

export function getQuizSessionSnapshot(lessonId: string) {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage.getItem(sessionKey(lessonId))
  } catch {
    return null
  }
}

export function subscribeQuizSession(listener: () => void) {
  if (typeof window === 'undefined') return () => undefined

  const handleUpdate = () => listener()
  window.addEventListener('storage', handleUpdate)
  window.addEventListener(quizUpdateEvent, handleUpdate)

  return () => {
    window.removeEventListener('storage', handleUpdate)
    window.removeEventListener(quizUpdateEvent, handleUpdate)
  }
}

export function saveQuizSession(lessonId: string, session: QuizSession) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(sessionKey(lessonId), JSON.stringify(session))
    window.dispatchEvent(new Event(quizUpdateEvent))
  } catch {
    return
  }
}

export function clearQuizSession(lessonId: string) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.removeItem(sessionKey(lessonId))
    window.dispatchEvent(new Event(quizUpdateEvent))
  } catch {
    return
  }
}
