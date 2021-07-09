// deps
import mongoose, { Document, Schema } from 'mongoose'

export interface ForgetPassword {
  key: string
  userId: string
  expiration: string
}

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

export const ForgetPasswordModel = mongoose.model<ForgetPassword & Document>(
  'ForgetPassword',
  forgetPasswordSchema,
  'forget_passwords'
)
