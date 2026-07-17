import { describe, expect, it } from 'vitest'

import type { QuizQuestion } from '../content/courses'
import { scoreQuiz } from './quiz'

const questions: readonly QuizQuestion[] = [
  {
    id: 'one',
    prompt: 'Question one',
    options: ['A', 'B'],
    correctAnswerIndex: 0,
    explanation: 'Explanation one',
  },
  {
    id: 'two',
    prompt: 'Question two',
    options: ['A', 'B'],
    correctAnswerIndex: 1,
    explanation: 'Explanation two',
  },
]

describe('scoreQuiz', () => {
  it('calculates correct answers and percentage', () => {
    expect(scoreQuiz(questions, { one: 0, two: 0 })).toEqual({
      correct: 1,
      total: 2,
      percentage: 50,
    })
  })

  it('handles an empty quiz', () => {
    expect(scoreQuiz([], {})).toEqual({ correct: 0, total: 0, percentage: 0 })
  })
})
