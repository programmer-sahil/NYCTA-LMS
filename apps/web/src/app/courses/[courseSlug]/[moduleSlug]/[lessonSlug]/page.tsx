import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LessonView } from '@/components/learning/lesson-view'
import { siteConfig } from '@/config/site'
import {
  getCourseBySlug,
  getLessonBySlug,
  getModuleBySlug,
  publishedCourses,
} from '@/content/courses'

interface LessonPageProps {
  params: Promise<{
    courseSlug: string
    moduleSlug: string
    lessonSlug: string
  }>
}

export function generateStaticParams() {
  return publishedCourses.flatMap((course) =>
    course.modules.flatMap((courseModule) =>
      courseModule.lessons
        .filter((lesson) => courseModule.published && lesson.published)
        .map((lesson) => ({
          courseSlug: course.slug,
          moduleSlug: courseModule.slug,
          lessonSlug: lesson.slug,
        })),
    ),
  )
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { courseSlug, moduleSlug, lessonSlug } = await params
  const course = getCourseBySlug(courseSlug)
  const courseModule = course ? getModuleBySlug(course, moduleSlug) : undefined
  const lesson = courseModule
    ? getLessonBySlug(courseModule, lessonSlug)
    : undefined

  if (!course || !courseModule || !lesson) {
    return { title: 'Lesson not found' }
  }

  return {
    title: `${lesson.title} | ${course.shortTitle}`,
    description: lesson.summary,
    openGraph: {
      title: `${lesson.title} | ${siteConfig.shortName}`,
      description: lesson.summary,
      type: 'article',
      locale: 'en_IN',
      siteName: siteConfig.name,
    },
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseSlug, moduleSlug, lessonSlug } = await params
  const course = getCourseBySlug(courseSlug)

  if (!course) {
    notFound()
  }

  const courseModule = getModuleBySlug(course, moduleSlug)

  if (!courseModule) {
    notFound()
  }

  const lesson = getLessonBySlug(courseModule, lessonSlug)

  if (!lesson) {
    notFound()
  }

  return (
    <LessonView course={course} courseModule={courseModule} lesson={lesson} />
  )
}
