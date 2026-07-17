import {
  type InferSchemaType,
  type Model,
  model,
  models,
  Schema,
} from 'mongoose'

const revisionPointSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    explanation: { type: String, default: '' },
    question: { type: String, default: '' },
    answer: { type: String, default: '' },
  },
  { _id: false },
)

const practiceQuestionSchema = new Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: ['multiple-choice', 'true-false', 'short-answer', 'coding'],
      required: true,
    },
    prompt: { type: String, required: true },
    options: { type: [String], default: [] },
    correctAnswer: { type: Schema.Types.Mixed },
    hint: { type: String, default: '' },
    solution: { type: String, required: true },
    explanation: { type: String, required: true },
    starterCode: { type: String, default: '' },
  },
  { _id: false },
)

const quizQuestionSchema = new Schema(
  {
    id: { type: String, required: true },
    prompt: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswerIndex: { type: Number, required: true, min: 0 },
    explanation: { type: String, required: true },
  },
  { _id: false },
)

const codeExampleSchema = new Schema(
  {
    language: { type: String, required: true },
    code: { type: String, required: true },
    explanation: { type: String, default: '' },
    expectedOutput: { type: String, default: '' },
  },
  { _id: false },
)

const resourceSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    type: {
      type: String,
      enum: ['article', 'video', 'download', 'tool', 'other'],
      required: true,
    },
    url: { type: String, default: '' },
  },
  { _id: false },
)

const lessonSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'CourseModule',
      required: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    slug: { type: String, required: true, trim: true, lowercase: true },
    summary: { type: String, required: true, trim: true, maxlength: 1_000 },
    estimatedMinutes: { type: Number, required: true, min: 1 },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    youtubeUrl: { type: String, default: '' },
    overview: { type: String, required: true },
    notes: { type: [String], default: [] },
    revisionPoints: { type: [revisionPointSchema], default: [] },
    practiceQuestions: { type: [practiceQuestionSchema], default: [] },
    quizQuestions: { type: [quizQuestionSchema], default: [] },
    codeExample: { type: codeExampleSchema, default: null },
    resources: { type: [resourceSchema], default: [] },
    order: { type: Number, required: true, min: 0 },
    published: { type: Boolean, default: false, required: true },
  },
  { timestamps: true },
)

lessonSchema.index({ moduleId: 1, slug: 1 }, { unique: true })
lessonSchema.index({ moduleId: 1, order: 1 }, { unique: true })
lessonSchema.index({ courseId: 1, moduleId: 1, published: 1, order: 1 })

export type Lesson = InferSchemaType<typeof lessonSchema>
export const LessonModel: Model<Lesson> =
  (models.Lesson as Model<Lesson> | undefined) ??
  model<Lesson>('Lesson', lessonSchema)
