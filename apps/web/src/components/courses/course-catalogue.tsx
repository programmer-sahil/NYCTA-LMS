'use client'

import { Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

import { EmptyState } from '@/components/states/empty-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Course } from '@/content/courses'
import { courseCategories } from '@/content/courses'

import { CourseCard } from './course-card'

interface CourseCatalogueProps {
  courses: readonly Course[]
}

export function CourseCatalogue({ courses }: CourseCatalogueProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All courses')
  const normalisedQuery = query.trim().toLowerCase()
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      activeCategory === 'All courses' || course.category === activeCategory
    const searchableText = [
      course.title,
      course.shortTitle,
      course.subtitle,
      course.description,
      course.category,
      ...course.highlights,
    ]
      .join(' ')
      .toLowerCase()

    return matchesCategory && searchableText.includes(normalisedQuery)
  })

  return (
    <div>
      <div className="rounded-2xl border border-border bg-card/65 p-4 sm:p-5">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-10"
            placeholder="Search by course, topic, or technology"
            aria-label="Search courses"
          />
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filter by category
        </div>
        <div
          className="mt-3 flex flex-wrap gap-2"
          aria-label="Course categories"
        >
          {courseCategories.map((category) => (
            <Button
              key={category}
              type="button"
              size="sm"
              variant={activeCategory === category ? 'default' : 'outline'}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        Showing {filteredCourses.length} of {courses.length} courses
      </p>

      {filteredCourses.length > 0 ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <EmptyState
            title="No courses match these filters"
            description="Try a different search term or select another course category."
            action={
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setQuery('')
                  setActiveCategory('All courses')
                }}
              >
                Clear filters
              </Button>
            }
          />
        </div>
      )}
    </div>
  )
}
