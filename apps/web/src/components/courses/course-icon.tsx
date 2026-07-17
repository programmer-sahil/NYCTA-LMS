import {
  BarChart3,
  Braces,
  BrainCircuit,
  Code2,
  Coffee,
  TerminalSquare,
} from 'lucide-react'

import type { CourseIcon as CourseIconName } from '@/content/courses'
import { cn } from '@/lib/utils'

const icons = {
  analytics: BarChart3,
  'data-science': BrainCircuit,
  'full-stack': Code2,
  python: Braces,
  'c-cpp': TerminalSquare,
  java: Coffee,
} satisfies Record<CourseIconName, typeof BarChart3>

interface CourseIconProps {
  name: CourseIconName
  className?: string
}

export function CourseIcon({ name, className }: CourseIconProps) {
  const Icon = icons[name]

  return <Icon className={cn('size-5', className)} aria-hidden="true" />
}
