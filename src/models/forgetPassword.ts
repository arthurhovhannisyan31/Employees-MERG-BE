// deps
import mongoose, { Document, Schema } from 'mongoose'
// model
import { ForgotPassword } from './generated'

const forgetPasswordSchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  expiration: {
    type: String,
    required: true,
  },
})

export const ForgotPasswordModel = mongoose.model<ForgotPassword & Document>(
  'ForgotPassword',
  forgetPasswordSchema,
  'forget_passwords'
)
