import {
  type InferSchemaType,
  type Model,
  model,
  models,
  Schema,
} from 'mongoose'

const enrollmentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    status: {
      type: String,
      enum: ['active', 'paused', 'completed', 'cancelled'],
      default: 'active',
      required: true,
    },
    enrolledAt: { type: Date, default: Date.now, required: true },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true },
)

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true })
enrollmentSchema.index({ courseId: 1, status: 1 })

export type Enrollment = InferSchemaType<typeof enrollmentSchema>
export const EnrollmentModel: Model<Enrollment> =
  (models.Enrollment as Model<Enrollment> | undefined) ??
  model<Enrollment>('Enrollment', enrollmentSchema)
