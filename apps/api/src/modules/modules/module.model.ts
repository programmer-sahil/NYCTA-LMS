import {
  type InferSchemaType,
  type Model,
  model,
  models,
  Schema,
} from 'mongoose'

const courseModuleSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    slug: { type: String, required: true, trim: true, lowercase: true },
    summary: { type: String, required: true, trim: true, maxlength: 1_000 },
    order: { type: Number, required: true, min: 0 },
    published: { type: Boolean, default: false, required: true },
  },
  { timestamps: true },
)

courseModuleSchema.index({ courseId: 1, slug: 1 }, { unique: true })
courseModuleSchema.index({ courseId: 1, order: 1 }, { unique: true })
courseModuleSchema.index({ courseId: 1, published: 1, order: 1 })

export type CourseModule = InferSchemaType<typeof courseModuleSchema>
export const CourseModuleModel: Model<CourseModule> =
  (models.CourseModule as Model<CourseModule> | undefined) ??
  model<CourseModule>('CourseModule', courseModuleSchema)
