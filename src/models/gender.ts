// deps
import mongoose, { Schema } from 'mongoose'
// local
// helpers
import { IGender } from '../types'

const GenderSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
})

export const GenderModel = mongoose.model<IGender>(
  'Gender',
  GenderSchema,
  'genders'
)
