import {
  type InferSchemaType,
  type Model,
  model,
  models,
  Schema,
} from 'mongoose'

const projectSubmissionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    repositoryUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    notes: { type: String, default: '', maxlength: 5_000 },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'reviewed', 'needs-revision', 'approved'],
      default: 'draft',
      required: true,
    },
    feedback: { type: String, default: '', maxlength: 5_000 },
  },
  { timestamps: true },
)

projectSubmissionSchema.index({ userId: 1, courseId: 1, status: 1 })
projectSubmissionSchema.index({ courseId: 1, status: 1, createdAt: -1 })

export type ProjectSubmission = InferSchemaType<typeof projectSubmissionSchema>
export const ProjectSubmissionModel: Model<ProjectSubmission> =
  (models.ProjectSubmission as Model<ProjectSubmission> | undefined) ??
  model<ProjectSubmission>('ProjectSubmission', projectSubmissionSchema)
