import {
  type InferSchemaType,
  type Model,
  model,
  models,
  Schema,
} from 'mongoose'

const lessonProgressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'CourseModule',
      required: true,
    },
    lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    completed: { type: Boolean, default: false, required: true },
    completedAt: { type: Date, default: null },
    lastPositionSeconds: { type: Number, default: 0, min: 0, required: true },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
)

lessonProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true })
lessonProgressSchema.index({ userId: 1, courseId: 1, completed: 1 })
lessonProgressSchema.index({ userId: 1, moduleId: 1 })

export type LessonProgress = InferSchemaType<typeof lessonProgressSchema>
export const LessonProgressModel: Model<LessonProgress> =
  (models.LessonProgress as Model<LessonProgress> | undefined) ??
  model<LessonProgress>('LessonProgress', lessonProgressSchema)
