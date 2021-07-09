// deps
import mongoose, { Document, Schema } from 'mongoose'

export interface Gender {
  _id: string
  name: string
}

const GenderSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
})

export interface CreateGenderInput {
  input: Gender
}

export const GenderModel = mongoose.model<Gender & Document>(
  'Gender',
  GenderSchema,
  'genders'
)
