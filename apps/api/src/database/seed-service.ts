import { CourseModel } from '../modules/courses/course.model.js'
import { LessonModel } from '../modules/lessons/lesson.model.js'
import { CourseModuleModel } from '../modules/modules/module.model.js'
import {
  officialCourseSeedData,
  samplePythonLessons,
  toSlug,
} from './seed-data.js'

export interface SeedResult {
  coursesProcessed: number
  modulesProcessed: number
  lessonsProcessed: number
}

const placeholder = 'Lesson content will be added by the instructor.'

export async function seedDatabase(): Promise<SeedResult> {
  let modulesProcessed = 0
  let lessonsProcessed = 0

  for (const [courseIndex, courseSeed] of officialCourseSeedData.entries()) {
    const course = await CourseModel.findOneAndUpdate(
      { slug: courseSeed.slug },
      {
        $setOnInsert: {
          title: courseSeed.title,
          slug: courseSeed.slug,
          shortDescription: courseSeed.shortDescription,
          description: courseSeed.description,
          theme: courseSeed.theme,
          icon: courseSeed.icon,
          level: 'beginner',
          learningMode: 'hybrid',
          highlights: [
            'Beginner-friendly roadmap',
            'Guided practice and projects',
            'Interview preparation support',
          ],
          published: true,
          order: courseIndex + 1,
        },
      },
      { upsert: true, new: true, runValidators: true },
    ).exec()

    for (const [moduleIndex, moduleTitle] of courseSeed.modules.entries()) {
      const moduleSlug = toSlug(moduleTitle)
      const courseModule = await CourseModuleModel.findOneAndUpdate(
        { courseId: course._id, slug: moduleSlug },
        {
          $setOnInsert: {
            courseId: course._id,
            title: moduleTitle,
            slug: moduleSlug,
            summary: `${moduleTitle} curriculum details will be added by the instructor.`,
            order: moduleIndex + 1,
            published: true,
          },
        },
        { upsert: true, new: true, runValidators: true },
      ).exec()
      modulesProcessed += 1

      if (
        courseSeed.slug !== 'data-analytics-genai' ||
        moduleSlug !== 'python-for-data-analytics'
      ) {
        continue
      }

      for (const [lessonIndex, lessonSeed] of samplePythonLessons.entries()) {
        await LessonModel.findOneAndUpdate(
          { moduleId: courseModule._id, slug: lessonSeed.slug },
          {
            $setOnInsert: {
              courseId: course._id,
              moduleId: courseModule._id,
              ...lessonSeed,
              summary: placeholder,
              difficulty: 'beginner',
              youtubeUrl: '',
              overview: placeholder,
              notes: [placeholder],
              revisionPoints: [],
              practiceQuestions: [],
              quizQuestions: [],
              codeExample: null,
              resources: [],
              order: lessonIndex + 1,
              published: true,
            },
          },
          { upsert: true, new: true, runValidators: true },
        ).exec()
        lessonsProcessed += 1
      }
    }
  }

  return {
    coursesProcessed: officialCourseSeedData.length,
    modulesProcessed,
    lessonsProcessed,
  }
}
