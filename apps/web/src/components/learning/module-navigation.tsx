'use client'

import { Menu } from 'lucide-react'

import { CourseSidebar } from '@/components/learning/course-sidebar'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Course } from '@/content/courses'

interface ModuleNavigationProps {
  course: Course
  activeModuleSlug: string
  activeLessonSlug?: string
}

export function ModuleNavigation({
  course,
  activeModuleSlug,
  activeLessonSlug,
}: ModuleNavigationProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <Menu data-icon="inline-start" aria-hidden="true" />
          Course navigation
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[min(24rem,92vw)] overflow-y-auto bg-background p-4">
        <SheetHeader className="mb-4 text-left">
          <SheetTitle>{course.shortTitle}</SheetTitle>
          <SheetDescription>
            Browse modules and available lessons.
          </SheetDescription>
        </SheetHeader>
        <CourseSidebar
          course={course}
          activeModuleSlug={activeModuleSlug}
          activeLessonSlug={activeLessonSlug}
          className="border-0 bg-transparent p-0"
        />
      </SheetContent>
    </Sheet>
  )
}
