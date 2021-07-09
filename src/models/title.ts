// deps
import mongoose, { Document, Schema } from 'mongoose'

export interface Title {
  _id: string
  name: string
}

export interface TitleInput {
  input: Title
}

const TitleSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
})

export const TitleModel = mongoose.model<Title & Document>(
  'Title',
  TitleSchema,
  'titles'
)
