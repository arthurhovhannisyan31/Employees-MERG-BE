// deps
import mongoose, { Document, Schema } from 'mongoose'
// local
// helpers

export interface ITitle extends Document {
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

export const TitleModel = mongoose.model<ITitle>('Title', TitleSchema, 'titles')
