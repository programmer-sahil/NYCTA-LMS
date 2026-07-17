# NYCTA LMS Product Specification

## Institute brief

- **Full name:** National Youth Computer Training Center
- **Short name:** NYCTA
- **Locations:** Bandel and Chandannagar
- **District:** Hooghly
- **State:** West Bengal
- **Phone:** 7003573290, 8583058673
- **Learning mode:** Hybrid

NYCTA provides computer training through in-person and online learning. Its facilities and learning support include AC classrooms, digital boards for project work, recorded online videos, revision materials, practice questions, practical projects, and interview preparation.

The canonical short name and institute identity are stored in `packages/shared/src/institute.ts` so future applications can use one configuration source.

## Platform vision

The NYCTA Learning Management System will provide a scalable digital home for public course discovery, enrolled-student learning, instructor delivery, and institute administration across both centers. The product should support hybrid teaching without treating classroom and online participation as separate products.

## Intended users

- **Prospective learners:** discover the institute and available courses.
- **Students:** access enrolled courses, lessons, recordings, revision resources, practice questions, projects, and progress information.
- **Instructors:** manage assigned course content and student learning activities.
- **Administrators:** manage courses, users, enrollments, locations, content, and platform operations.

## Planned capability areas

1. Public institute and course information.
2. Secure authentication and role-based access.
3. Student learning dashboard and course progress.
4. Recorded video and revision-material delivery.
5. Practice questions, projects, and submissions.
6. Instructor course and learner workflows.
7. Administrative management and reporting.
8. Interview-preparation resources.

## Product principles

- Mobile-friendly and accessible for learners using a broad range of devices.
- Clear separation between public information and authenticated learning data.
- Role-based authorization enforced by the API, not only by the interface.
- Shared course and API contracts across frontend and backend.
- Secure handling of personal data and institute operations.
- Extensible for additional locations, courses, and learning formats.

## Current phase boundary

This repository currently contains setup infrastructure only: workspace configuration, a minimal web confirmation page, a health endpoint, shared TypeScript contracts, and architecture documentation. The complete landing page, authentication, dashboards, admin tools, persistence models, and course lesson features are intentionally not implemented in this phase.
