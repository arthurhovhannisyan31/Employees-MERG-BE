import mongoose, { Document, Schema } from 'mongoose'

import { defaultFields } from '../utils/model'
import { regExps } from '../utils/regExps'
import { Gender } from './generated'

const GenderSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: regExps.modelString,
  },
  ...defaultFields,
})

export const GenderModel = mongoose.model<Gender & Document>(
  'Gender',
  GenderSchema,
  'genders'
)
