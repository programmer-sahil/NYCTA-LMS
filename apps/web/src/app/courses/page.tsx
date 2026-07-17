import type { Metadata } from 'next'

import { CourseCatalogue } from '@/components/courses/course-catalogue'
import { Container } from '@/components/shared/container'
import { GradientText } from '@/components/shared/gradient-text'
import { siteConfig } from '@/config/site'
import { publishedCourses } from '@/content/courses'

const description =
  'Explore six beginner-focused technology courses with classroom guidance, recorded learning support, practice, projects, and interview preparation.'

export const metadata: Metadata = {
  title: 'Technology Course Catalogue',
  description,
  openGraph: {
    title: `Technology Course Catalogue | ${siteConfig.shortName}`,
    description,
    type: 'website',
    locale: 'en_IN',
    siteName: siteConfig.name,
  },
}

export default function CoursesPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-border py-14 sm:py-20">
        <div
          className="home-grid absolute inset-0 opacity-45"
          aria-hidden="true"
        />
        <Container className="relative">
          <p className="font-mono text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            NYCTA course catalogue
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Find a practical path for your{' '}
            <GradientText>technology goals</GradientText>
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Compare all six official course directions. Each path combines
            guided classroom learning with revision resources, practice, and
            project support.
          </p>
        </Container>
      </header>

      <section className="py-12 sm:py-16" aria-labelledby="catalogue-title">
        <Container>
          <div className="max-w-3xl">
            <h2
              id="catalogue-title"
              className="text-3xl font-semibold tracking-tight"
            >
              All courses
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Search by skill or narrow the catalogue by a broad learning
              category.
            </p>
          </div>
          <div className="mt-8">
            <CourseCatalogue courses={publishedCourses} />
          </div>
        </Container>
      </section>
    </>
  )
}
