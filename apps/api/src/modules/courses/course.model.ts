import {
  type InferSchemaType,
  type Model,
  model,
  models,
  Schema,
} from 'mongoose'

export const courseThemes = ['cyan', 'violet', 'emerald', 'amber'] as const
export const courseLevels = ['beginner', 'intermediate', 'advanced'] as const
export const learningModes = ['hybrid', 'classroom', 'online'] as const

const courseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    slug: { type: String, required: true, trim: true, lowercase: true },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    description: { type: String, required: true, trim: true, maxlength: 2_000 },
    theme: { type: String, enum: courseThemes, required: true },
    icon: { type: String, required: true, trim: true, maxlength: 80 },
    level: { type: String, enum: courseLevels, required: true },
    learningMode: { type: String, enum: learningModes, required: true },
    highlights: { type: [String], default: [] },
    published: { type: Boolean, default: false, required: true },
    order: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
)

courseSchema.index({ slug: 1 }, { unique: true })
courseSchema.index({ published: 1, order: 1 })

export type Course = InferSchemaType<typeof courseSchema>
export const CourseModel: Model<Course> =
  (models.Course as Model<Course> | undefined) ??
  model<Course>('Course', courseSchema)
