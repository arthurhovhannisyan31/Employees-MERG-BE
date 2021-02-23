// deps
import mongoose, { Document, Schema } from 'mongoose'
// local
// helpers

export interface IGender extends Document {
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

export interface ICreateGenderInput {
  input: IGender
}

export const GenderModel = mongoose.model<IGender>(
  'Gender',
  GenderSchema,
  'genders',
)
