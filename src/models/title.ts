import mongoose, { Schema } from 'mongoose'

const TitleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
})

export const TitleModel = mongoose.model('Title', TitleSchema, 'titles')
