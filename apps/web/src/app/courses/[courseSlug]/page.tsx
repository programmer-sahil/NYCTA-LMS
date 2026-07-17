import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CourseOverview } from '@/components/courses/course-overview'
import { siteConfig } from '@/config/site'
import { getCourseBySlug, publishedCourses } from '@/content/courses'

interface CoursePageProps {
  params: Promise<{ courseSlug: string }>
}

export function generateStaticParams() {
  return publishedCourses.map((course) => ({ courseSlug: course.slug }))
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { courseSlug } = await params
  const course = getCourseBySlug(courseSlug)

  if (!course) {
    return { title: 'Course not found' }
  }

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: `${course.title} | ${siteConfig.shortName}`,
      description: course.description,
      type: 'website',
      locale: 'en_IN',
      siteName: siteConfig.name,
    },
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseSlug } = await params
  const course = getCourseBySlug(courseSlug)

  if (!course) {
    notFound()
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Courses',
        item: '/courses',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: course.title,
        item: `/courses/${course.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CourseOverview course={course} />
    </>
  )
}
