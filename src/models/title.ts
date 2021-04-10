// deps
import mongoose, { Document, Schema } from 'mongoose'

export interface ITitle {
  _id: string
  name: string
}

export interface ITitleInput {
  input: ITitle
}

const TitleSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
})

export const TitleModel = mongoose.model<ITitle & Document>(
  'Title',
  TitleSchema,
  'titles',
)
