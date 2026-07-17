'use client'

import { CircleHelp, RotateCcw } from 'lucide-react'
import { useState, useSyncExternalStore } from 'react'

import { EmptyState } from '@/components/states/empty-state'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { QuizQuestion } from '@/content/courses'
import { localStudentProgressService } from '@/lib/student-progress'
import {
  clearQuizSession,
  getQuizSessionSnapshot,
  parseQuizSession,
  saveQuizSession,
  scoreQuiz,
  subscribeQuizSession,
  type QuizScore,
} from '@/lib/quiz'

interface QuizPanelProps {
  lessonId: string
  questions: readonly QuizQuestion[]
}

export function QuizPanel({ lessonId, questions }: QuizPanelProps) {
  const [submitted, setSubmitted] = useState(false)
  const [finalScore, setFinalScore] = useState<QuizScore | null>(null)
  const sessionSnapshot = useSyncExternalStore(
    subscribeQuizSession,
    () => getQuizSessionSnapshot(lessonId),
    () => null,
  )
  const session = parseQuizSession(sessionSnapshot)
  const currentIndex = Math.min(
    session?.currentQuestion ?? 0,
    Math.max(questions.length - 1, 0),
  )
  const answers = session?.answers ?? {}

  if (questions.length === 0) {
    return (
      <section aria-labelledby="quiz-title">
        <h2 id="quiz-title" className="text-2xl font-semibold tracking-tight">
          Knowledge check
        </h2>
        <div className="mt-5">
          <EmptyState
            icon={CircleHelp}
            title="Quiz questions coming soon"
            description="Knowledge-check questions will be added by the instructor."
          />
        </div>
      </section>
    )
  }

  const question = questions[currentIndex]
  const selectedAnswer = question ? answers[question.id] : undefined
  function restart() {
    setSubmitted(false)
    setFinalScore(null)
    clearQuizSession(lessonId)
  }

  if (finalScore) {
    return (
      <section aria-labelledby="quiz-title">
        <Card className="border-success/20 bg-success/5 shadow-none">
          <CardHeader>
            <CardTitle id="quiz-title" className="text-2xl">
              Quiz complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {finalScore.correct} / {finalScore.total}
            </p>
            <p className="mt-2 text-muted-foreground">
              Final score: {finalScore.percentage}%
            </p>
            <Button
              type="button"
              className="mt-5"
              variant="outline"
              onClick={restart}
            >
              <RotateCcw data-icon="inline-start" aria-hidden="true" /> Restart
              quiz
            </Button>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section aria-labelledby="quiz-title">
      <div className="flex items-center justify-between gap-4">
        <h2 id="quiz-title" className="text-2xl font-semibold tracking-tight">
          Knowledge check
        </h2>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {questions.length}
        </span>
      </div>
      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={currentIndex + 1}
      >
        <div
          className="h-full bg-primary transition-[width]"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>
      <Card className="mt-5 bg-card/65 shadow-none">
        <CardHeader>
          <CardTitle>{question?.prompt}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {question?.options.map((option, optionIndex) => (
              <Button
                key={option}
                type="button"
                variant={selectedAnswer === optionIndex ? 'default' : 'outline'}
                className="h-auto w-full justify-start whitespace-normal py-3 text-left"
                aria-pressed={selectedAnswer === optionIndex}
                disabled={submitted}
                onClick={() => {
                  const nextAnswers = { ...answers, [question.id]: optionIndex }
                  saveQuizSession(lessonId, {
                    currentQuestion: currentIndex,
                    answers: nextAnswers,
                  })
                }}
              >
                {option}
              </Button>
            ))}
          </div>
          {!submitted ? (
            <Button
              type="button"
              disabled={selectedAnswer === undefined}
              onClick={() => setSubmitted(true)}
            >
              Submit answer
            </Button>
          ) : (
            <div className="space-y-4" aria-live="polite">
              <p
                className={
                  selectedAnswer === question?.correctAnswerIndex
                    ? 'text-success'
                    : 'text-destructive'
                }
              >
                {selectedAnswer === question?.correctAnswerIndex
                  ? 'Correct.'
                  : 'Not quite yet.'}
              </p>
              <p className="rounded-lg bg-muted p-3 text-sm leading-6">
                {question?.explanation}
              </p>
              <Button
                type="button"
                onClick={() => {
                  if (currentIndex === questions.length - 1) {
                    const finalScore = scoreQuiz(questions, answers)
                    localStudentProgressService.saveQuizAttempt({
                      lessonId,
                      ...finalScore,
                      completedAt: new Date().toISOString(),
                    })
                    setFinalScore(finalScore)
                    clearQuizSession(lessonId)
                  } else {
                    const nextIndex = currentIndex + 1
                    setSubmitted(false)
                    saveQuizSession(lessonId, {
                      currentQuestion: nextIndex,
                      answers,
                    })
                  }
                }}
              >
                {currentIndex === questions.length - 1
                  ? 'See final score'
                  : 'Next question'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
