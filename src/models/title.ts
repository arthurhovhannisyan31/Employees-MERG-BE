// deps
import mongoose, { Document, Schema } from 'mongoose'
// model
import { Title } from './generated'

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
