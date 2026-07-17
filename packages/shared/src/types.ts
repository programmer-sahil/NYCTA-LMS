export interface CourseSummary {
  id: string
  title: string
  slug: string
  description: string
  durationInWeeks: number
  learningMode: 'online' | 'offline' | 'hybrid'
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export type UserRole = 'student' | 'instructor' | 'admin'
