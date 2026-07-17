'use client'

import { Copy, RotateCcw, TerminalSquare } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CodingPractice } from '@/content/courses'

interface CodingPracticePanelProps {
  exercise: CodingPractice | null
}

const languages = [
  'python',
  'javascript',
  'typescript',
  'java',
  'c',
  'cpp',
] as const

export function CodingPracticePanel({ exercise }: CodingPracticePanelProps) {
  const initialCode =
    exercise?.starterCode ?? '# Practice code will appear here'
  const [language, setLanguage] = useState(exercise?.language ?? 'python')
  const [code, setCode] = useState(initialCode)
  const [copyStatus, setCopyStatus] = useState('Copy')

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      setCopyStatus('Copied')
    } catch {
      setCopyStatus('Copy unavailable')
    }
  }

  return (
    <section aria-labelledby="coding-practice-title">
      <Card className="overflow-hidden border-primary/20 bg-card shadow-lg shadow-black/5">
        <CardHeader className="border-b border-border bg-muted/25">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <TerminalSquare
                className="size-5 text-primary"
                aria-hidden="true"
              />
              <CardTitle id="coding-practice-title" className="mt-2 text-xl">
                Coding practice
              </CardTitle>
            </div>
            <select
              aria-label="Programming language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
            >
              {languages.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-5">
          <div>
            <h3 className="text-sm font-semibold">Instructions</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {exercise?.instructions ??
                'Coding instructions will be added by the instructor.'}
            </p>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label
                htmlFor="lesson-code-editor"
                className="text-sm font-semibold"
              >
                Code editor
              </label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setCode(initialCode)
                    setCopyStatus('Copy')
                  }}
                >
                  <RotateCcw data-icon="inline-start" aria-hidden="true" />{' '}
                  Reset
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={copyCode}
                >
                  <Copy data-icon="inline-start" aria-hidden="true" />{' '}
                  {copyStatus}
                </Button>
              </div>
            </div>
            <textarea
              id="lesson-code-editor"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              spellCheck={false}
              className="min-h-64 w-full resize-y rounded-xl border border-input bg-background p-4 font-mono text-sm leading-6 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="rounded-xl border border-border bg-muted/25 p-4">
            <h3 className="text-sm font-semibold">Expected output</h3>
            <pre className="mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-sm text-muted-foreground">
              {exercise?.expectedOutput ??
                'Expected output will be added by the instructor.'}
            </pre>
          </div>
          <Button type="button" disabled className="w-full sm:w-auto">
            Execution Engine Coming Later
          </Button>
          <p className="text-xs leading-5 text-muted-foreground">
            Student code is not sent to or executed by the NYCTA Express API.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
