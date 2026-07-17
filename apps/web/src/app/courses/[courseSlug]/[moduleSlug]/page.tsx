import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ModuleOverview } from '@/components/learning/module-overview'
import { siteConfig } from '@/config/site'
import {
  getCourseBySlug,
  getModuleBySlug,
  publishedCourses,
} from '@/content/courses'

interface ModulePageProps {
  params: Promise<{ courseSlug: string; moduleSlug: string }>
}

export function generateStaticParams() {
  return publishedCourses.flatMap((course) =>
    course.modules
      .filter((courseModule) => courseModule.published)
      .map((courseModule) => ({
        courseSlug: course.slug,
        moduleSlug: courseModule.slug,
      })),
  )
}

export async function generateMetadata({
  params,
}: ModulePageProps): Promise<Metadata> {
  const { courseSlug, moduleSlug } = await params
  const course = getCourseBySlug(courseSlug)
  const courseModule = course ? getModuleBySlug(course, moduleSlug) : undefined

  if (!course || !courseModule) {
    return { title: 'Module not found' }
  }

  return {
    title: `${courseModule.title} | ${course.shortTitle}`,
    description: courseModule.summary,
    openGraph: {
      title: `${courseModule.title} | ${siteConfig.shortName}`,
      description: courseModule.summary,
      type: 'website',
      locale: 'en_IN',
      siteName: siteConfig.name,
    },
  }
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { courseSlug, moduleSlug } = await params
  const course = getCourseBySlug(courseSlug)

  if (!course) {
    notFound()
  }

  const courseModule = getModuleBySlug(course, moduleSlug)

  if (!courseModule) {
    notFound()
  }

  return <ModuleOverview course={course} courseModule={courseModule} />
}
