import {
  connectToDatabase,
  disconnectFromDatabase,
} from '../config/database.js'
import { env } from '../config/env.js'
import { logger } from '../config/logger.js'
import { CourseModel } from '../modules/courses/course.model.js'
import { EnrollmentModel } from '../modules/enrollments/enrollment.model.js'
import { LessonModel } from '../modules/lessons/lesson.model.js'
import { CourseModuleModel } from '../modules/modules/module.model.js'
import { LessonProgressModel } from '../modules/progress/lesson-progress.model.js'
import { ProjectSubmissionModel } from '../modules/projects/project-submission.model.js'
import { QuizAttemptModel } from '../modules/quizzes/quiz-attempt.model.js'
import { UserModel } from '../modules/users/user.model.js'

async function run(): Promise<void> {
  if (env.nodeEnv !== 'development') {
    throw new Error('Database reset is restricted to NODE_ENV=development')
  }
  if (!process.argv.includes('--confirm')) {
    throw new Error('Database reset requires the explicit --confirm flag')
  }

  await connectToDatabase(env.mongoDbUri)
  const results = await Promise.all([
    QuizAttemptModel.deleteMany({}),
    LessonProgressModel.deleteMany({}),
    ProjectSubmissionModel.deleteMany({}),
    EnrollmentModel.deleteMany({}),
    LessonModel.deleteMany({}),
    CourseModuleModel.deleteMany({}),
    CourseModel.deleteMany({}),
    UserModel.deleteMany({}),
  ])
  const deletedDocuments = results.reduce(
    (total, result) => total + result.deletedCount,
    0,
  )
  logger.warn({ deletedDocuments }, 'Development database reset completed')
  await disconnectFromDatabase()
}

run().catch(async (error: unknown) => {
  logger.error({ error }, 'Development database reset failed')
  await disconnectFromDatabase()
  process.exitCode = 1
})
