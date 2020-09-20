import mongoose, { Schema } from 'mongoose'

const GenderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
})

export const GenderModel = mongoose.model('Gender', GenderSchema, 'genders')
