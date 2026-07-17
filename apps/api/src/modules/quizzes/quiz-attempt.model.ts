import {
  type InferSchemaType,
  type Model,
  model,
  models,
  Schema,
} from 'mongoose'

const quizAnswerSchema = new Schema(
  {
    questionId: { type: String, required: true },
    answer: { type: Schema.Types.Mixed, required: true },
    correct: { type: Boolean, required: true },
  },
  { _id: false },
)

const quizAttemptSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    score: { type: Number, required: true, min: 0 },
    totalQuestions: { type: Number, required: true, min: 0 },
    answers: { type: [quizAnswerSchema], default: [] },
    completedAt: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true },
)

quizAttemptSchema.index({ userId: 1, lessonId: 1, completedAt: -1 })
quizAttemptSchema.index({ lessonId: 1, completedAt: -1 })

export type QuizAttempt = InferSchemaType<typeof quizAttemptSchema>
export const QuizAttemptModel: Model<QuizAttempt> =
  (models.QuizAttempt as Model<QuizAttempt> | undefined) ??
  model<QuizAttempt>('QuizAttempt', quizAttemptSchema)
