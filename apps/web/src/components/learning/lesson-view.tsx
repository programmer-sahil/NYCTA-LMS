import Link from 'next/link'

import { CodingPracticePanel } from '@/components/learning/coding-practice-panel'
import { CourseSidebar } from '@/components/learning/course-sidebar'
import { LessonHeader } from '@/components/learning/lesson-header'
import { LessonNotes } from '@/components/learning/lesson-notes'
import { LessonProgress } from '@/components/learning/lesson-progress'
import { LessonResources } from '@/components/learning/lesson-resources'
import { LessonVideo } from '@/components/learning/lesson-video'
import { ModuleNavigation } from '@/components/learning/module-navigation'
import { PracticePanel } from '@/components/learning/practice-panel'
import { PreviousNextNavigation } from '@/components/learning/previous-next-navigation'
import { QuizPanel } from '@/components/learning/quiz-panel'
import { ReadingProgress } from '@/components/learning/reading-progress'
import { RevisionCards } from '@/components/learning/revision-cards'
import { Container } from '@/components/shared/container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Course, CourseModule, Lesson } from '@/content/courses'

interface LessonViewProps {
  course: Course
  courseModule: CourseModule
  lesson: Lesson
}

export function LessonView({ course, courseModule, lesson }: LessonViewProps) {
  const continueHref = lesson.nextLesson
    ? `/courses/${course.slug}/${courseModule.slug}/${lesson.nextLesson}`
    : `/courses/${course.slug}/${courseModule.slug}`

  return (
    <article className="pb-24 pt-8 sm:pt-10 lg:pb-14">
      <ReadingProgress />
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/courses">Courses</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/courses/${course.slug}`}>{course.shortTitle}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/courses/${course.slug}/${courseModule.slug}`}>
                {courseModule.title}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground" aria-current="page">
              {lesson.title}
            </li>
          </ol>
        </nav>

        <div className="mt-5">
          <ModuleNavigation
            course={course}
            activeModuleSlug={courseModule.slug}
            activeLessonSlug={lesson.slug}
          />
        </div>

        <div className="mt-7 grid items-start gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div className="hidden space-y-4 lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
            <CourseSidebar
              course={course}
              activeModuleSlug={courseModule.slug}
              activeLessonSlug={lesson.slug}
            />
            <LessonProgress lessonId={lesson.id} continueHref={continueHref} />
          </div>

          <div className="min-w-0 space-y-12">
            <LessonHeader courseModule={courseModule} lesson={lesson} />
            <div className="lg:hidden">
              <LessonProgress
                lessonId={lesson.id}
                continueHref={continueHref}
              />
            </div>
            <LessonVideo youtubeUrl={lesson.youtubeUrl} title={lesson.title} />

            <section aria-labelledby="lesson-overview-title">
              <Card className="border-border/80 bg-card/65 shadow-none">
                <CardHeader>
                  <CardTitle id="lesson-overview-title" className="text-2xl">
                    Lesson overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="leading-7 text-muted-foreground">
                  {lesson.overview}
                </CardContent>
              </Card>
            </section>

            <section aria-labelledby="learning-workspace-title">
              <h2
                id="learning-workspace-title"
                className="mb-5 text-2xl font-semibold tracking-tight"
              >
                Learning workspace
              </h2>
              <Tabs defaultValue="notes">
                <TabsList aria-label="Lesson learning tools">
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="revision">Revision</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                <TabsContent value="notes">
                  <LessonNotes lesson={lesson} />
                </TabsContent>
                <TabsContent value="revision">
                  <RevisionCards revisionPoints={lesson.revisionPoints} />
                </TabsContent>
                <TabsContent value="practice">
                  <PracticePanel questions={lesson.practiceQuestions} />
                </TabsContent>
                <TabsContent value="quiz">
                  <QuizPanel
                    lessonId={lesson.id}
                    questions={lesson.quizQuestions}
                  />
                </TabsContent>
                <TabsContent value="code">
                  <CodingPracticePanel exercise={lesson.codingPractice} />
                </TabsContent>
                <TabsContent value="resources">
                  <LessonResources resources={lesson.resources} />
                </TabsContent>
              </Tabs>
            </section>

            <div className="hidden lg:block">
              <PreviousNextNavigation
                course={course}
                courseModule={courseModule}
                lesson={lesson}
              />
            </div>
          </div>
        </div>
      </Container>

      <PreviousNextNavigation
        course={course}
        courseModule={courseModule}
        lesson={lesson}
        mobile
      />
    </article>
  )
}
