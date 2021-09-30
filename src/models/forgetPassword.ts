import mongoose, { Document, Schema } from 'mongoose'

import { ForgottenPassword } from './generated'

const forgottenPasswordSchema = new Schema({
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

export const ForgottenPasswordModel = mongoose.model<
  ForgottenPassword & Document
>('ForgottenPassword', forgottenPasswordSchema, 'forgotten_passwords')
