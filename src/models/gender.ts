// deps
import mongoose, { Document, Schema } from 'mongoose'
// model
import { Gender } from './generated'

const GenderSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
})

export const GenderModel = mongoose.model<Gender & Document>(
  'Gender',
  GenderSchema,
  'genders'
)
