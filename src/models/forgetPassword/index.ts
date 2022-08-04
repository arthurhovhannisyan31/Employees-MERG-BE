import mongoose, { Document, Schema } from 'mongoose'

import { defaultFields } from '../../utils/model'
import { ForgottenPassword } from '../generated'

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
  ...defaultFields,
})

export const ForgottenPasswordModel = mongoose.model<
  ForgottenPassword & Document
>('ForgottenPassword', forgottenPasswordSchema, 'forgotten_passwords')
