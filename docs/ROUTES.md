# Planned Routes

This document is a route plan, not an implementation checklist for the current setup phase. Only `/` in the web app and `GET /api/health` in the API exist today.

## Public web routes

| Route             | Purpose                                    |
| ----------------- | ------------------------------------------ |
| `/`               | Institute landing page                     |
| `/about`          | Institute story, locations, and facilities |
| `/courses`        | Public course catalog                      |
| `/courses/[slug]` | Public course details                      |
| `/contact`        | Contact and center information             |
| `/login`          | Account sign-in                            |

## Student web routes

| Route                                            | Purpose                         |
| ------------------------------------------------ | ------------------------------- |
| `/student`                                       | Student dashboard               |
| `/student/courses`                               | Enrolled courses                |
| `/student/courses/[courseId]`                    | Course overview and progress    |
| `/student/courses/[courseId]/lessons/[lessonId]` | Lesson player and resources     |
| `/student/practice`                              | Practice question sets          |
| `/student/projects`                              | Projects and submissions        |
| `/student/profile`                               | Student profile and preferences |

## Instructor web routes

| Route                            | Purpose                               |
| -------------------------------- | ------------------------------------- |
| `/instructor`                    | Instructor dashboard                  |
| `/instructor/courses`            | Assigned courses                      |
| `/instructor/courses/[courseId]` | Course content and learner management |
| `/instructor/submissions`        | Project and practice review           |

## Admin web routes

| Route                | Purpose                                   |
| -------------------- | ----------------------------------------- |
| `/admin`             | Administrative overview                   |
| `/admin/users`       | Student, instructor, and admin management |
| `/admin/courses`     | Course management                         |
| `/admin/enrollments` | Enrollment management                     |
| `/admin/content`     | Learning-content management               |
| `/admin/locations`   | Center configuration                      |
| `/admin/reports`     | Operational and learning reports          |

## Planned API route groups

| Prefix             | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `/api/health`      | Service health; implemented in this phase |
| `/api/auth`        | Authentication and session workflows      |
| `/api/courses`     | Course discovery and management           |
| `/api/enrollments` | Enrollment workflows                      |
| `/api/lessons`     | Lesson and resource delivery              |
| `/api/practice`    | Practice questions and attempts           |
| `/api/projects`    | Projects and submissions                  |
| `/api/users`       | Role-aware user management                |
| `/api/reports`     | Administrative reporting                  |
