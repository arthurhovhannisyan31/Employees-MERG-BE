// deps
import mongoose, { Document, Schema } from 'mongoose'

export interface IGender {
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

export interface ICreateGenderInput {
  input: IGender
}

export const GenderModel = mongoose.model<IGender & Document>(
  'Gender',
  GenderSchema,
  'genders',
)
