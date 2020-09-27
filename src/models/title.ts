// deps
import mongoose, { Schema } from 'mongoose'
// local
// helpers
import { ITitle } from '../types'

const TitleSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
})

export const TitleModel = mongoose.model<ITitle>('Title', TitleSchema, 'titles')
