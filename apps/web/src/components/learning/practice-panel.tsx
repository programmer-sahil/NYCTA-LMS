'use client'

import { Eye, Lightbulb, ListChecks } from 'lucide-react'
import { useState } from 'react'

import { EmptyState } from '@/components/states/empty-state'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { PracticeQuestion } from '@/content/courses'

interface PracticePanelProps {
  questions: readonly PracticeQuestion[]
}

export function PracticePanel({ questions }: PracticePanelProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<ReadonlySet<string>>(new Set())
  const [visibleHints, setVisibleHints] = useState<ReadonlySet<string>>(
    new Set(),
  )
  const [visibleSolutions, setVisibleSolutions] = useState<ReadonlySet<string>>(
    new Set(),
  )

  if (questions.length === 0) {
    return (
      <section aria-labelledby="practice-title">
        <h2
          id="practice-title"
          className="text-2xl font-semibold tracking-tight"
        >
          Practice
        </h2>
        <div className="mt-5">
          <EmptyState
            icon={ListChecks}
            title="Practice questions coming soon"
            description="Practice activities will be added by the instructor."
          />
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="practice-title">
      <h2 id="practice-title" className="text-2xl font-semibold tracking-tight">
        Practice
      </h2>
      <ol className="mt-5 space-y-4">
        {questions.map((question, index) => {
          const answer = answers[question.id] ?? ''
          const hasSubmitted = submitted.has(question.id)

          return (
            <li key={question.id}>
              <Card className="bg-card/65 shadow-none">
                <CardHeader>
                  <p className="font-mono text-xs text-primary">
                    {question.type.replace('-', ' ')}
                  </p>
                  <CardTitle>
                    Question {index + 1}: {question.prompt}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {question.type === 'multiple-choice' ? (
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <label
                          key={option}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3"
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={answer === option}
                            onChange={(event) =>
                              setAnswers((current) => ({
                                ...current,
                                [question.id]: event.target.value,
                              }))
                            }
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : null}
                  {question.type === 'true-false' ? (
                    <div className="flex gap-3">
                      {['True', 'False'].map((option) => (
                        <Button
                          key={option}
                          type="button"
                          variant={answer === option ? 'default' : 'outline'}
                          aria-pressed={answer === option}
                          onClick={() =>
                            setAnswers((current) => ({
                              ...current,
                              [question.id]: option,
                            }))
                          }
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  ) : null}
                  {question.type === 'short-answer' ? (
                    <Input
                      aria-label={`Answer for question ${index + 1}`}
                      value={answer}
                      onChange={(event) =>
                        setAnswers((current) => ({
                          ...current,
                          [question.id]: event.target.value,
                        }))
                      }
                      placeholder="Type your answer"
                    />
                  ) : null}
                  {question.type === 'coding' ? (
                    <textarea
                      aria-label={`Code answer for question ${index + 1}`}
                      className="min-h-40 w-full rounded-xl border border-input bg-background p-4 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={answer || question.starterCode}
                      onChange={(event) =>
                        setAnswers((current) => ({
                          ...current,
                          [question.id]: event.target.value,
                        }))
                      }
                    />
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      disabled={!answer.trim()}
                      onClick={() =>
                        setSubmitted(
                          (current) => new Set([...current, question.id]),
                        )
                      }
                    >
                      Submit answer
                    </Button>
                    {question.hint ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setVisibleHints(
                            (current) => new Set([...current, question.id]),
                          )
                        }
                      >
                        <Lightbulb
                          data-icon="inline-start"
                          aria-hidden="true"
                        />{' '}
                        Reveal hint
                      </Button>
                    ) : null}
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setVisibleSolutions(
                          (current) => new Set([...current, question.id]),
                        )
                      }
                    >
                      <Eye data-icon="inline-start" aria-hidden="true" /> Reveal
                      solution
                    </Button>
                  </div>
                  {visibleHints.has(question.id) ? (
                    <p className="rounded-lg bg-warning/10 p-3 text-sm">
                      Hint: {question.hint}
                    </p>
                  ) : null}
                  {visibleSolutions.has(question.id) ? (
                    <p className="rounded-lg bg-primary/10 p-3 text-sm">
                      Solution: {question.solution}
                    </p>
                  ) : null}
                  {hasSubmitted ? (
                    <div
                      className="rounded-lg border border-success/20 bg-success/5 p-3 text-sm"
                      aria-live="polite"
                    >
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
