import mongoose, { Document, Schema } from 'mongoose'

import { defaultFields } from '../../utils/model'
import { regExps } from '../../utils/regExps'
import { User } from '../generated'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: regExps.modelString,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    match: regExps.modelString,
  },
  ...defaultFields,
})

export const UserModel = mongoose.model<User & Document>(
  'User',
  userSchema,
  'users'
)
