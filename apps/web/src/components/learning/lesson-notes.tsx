import { NotebookText } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Lesson } from '@/content/courses'

interface LessonNotesProps {
  lesson: Lesson
}

export function LessonNotes({ lesson }: LessonNotesProps) {
  return (
    <section aria-labelledby="lesson-notes-title">
      <Card className="border-border/80 bg-card/65 shadow-none">
        <CardHeader>
          <NotebookText className="size-5 text-primary" aria-hidden="true" />
          <CardTitle id="lesson-notes-title" className="mt-2 text-xl">
            Lesson notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lesson.notes.length > 0 ? (
            <ul className="space-y-3 leading-7 text-muted-foreground">
              {lesson.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">
              Lesson notes will be added by the instructor.
            </p>
          )}
          {lesson.codeExample ? (
            <pre className="mt-5 overflow-x-auto rounded-xl bg-background p-4 font-mono text-sm">
              <code>{lesson.codeExample}</code>
            </pre>
          ) : null}
        </CardContent>
      </Card>
    </section>
  )
}
