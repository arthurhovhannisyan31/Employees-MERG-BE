import mongoose, { Document, Schema } from 'mongoose'

import { defaultFields } from '../../utils/model'
import { regExps } from '../../utils/regExps'
import { Title } from '../generated'

const TitleSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    match: regExps.modelString,
  },
  ...defaultFields,
})

export const TitleModel = mongoose.model<Title & Document>(
  'Title',
  TitleSchema,
  'titles'
)
