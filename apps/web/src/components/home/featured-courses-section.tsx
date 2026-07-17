import { CourseCard } from '@/components/courses/course-card'
import { SectionHeading } from '@/components/shared/section-heading'
import { publishedCourses } from '@/content/courses'
import { homeContent } from '@/content/home'

import { HomeSection } from './home-section'

export function FeaturedCoursesSection() {
  const { courses } = homeContent

  return (
    <HomeSection
      id="featured-courses"
      className="border-y border-border bg-card/25"
      aria-labelledby="featured-courses-title"
    >
      <SectionHeading
        headingId="featured-courses-title"
        eyebrow={courses.eyebrow}
        title={courses.title}
        description={courses.description}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {publishedCourses.map((course, index) => (
          <CourseCard key={course.id} course={course} number={index + 1} />
        ))}
      </div>
    </HomeSection>
  )
}
