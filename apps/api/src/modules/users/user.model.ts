import {
  type InferSchemaType,
  type Model,
  model,
  models,
  Schema,
} from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
      required: true,
    },
    preferredCenter: {
      type: String,
      enum: ['Bandel', 'Chandannagar'],
      required: true,
    },
    active: { type: Boolean, default: true, required: true },
  },
  { timestamps: true },
)

userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ phone: 1 })
userSchema.index({ role: 1, active: 1 })

export type User = InferSchemaType<typeof userSchema>
export const UserModel: Model<User> =
  (models.User as Model<User> | undefined) ?? model<User>('User', userSchema)
