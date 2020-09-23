// deps
import mongoose, { Schema } from 'mongoose'
// local
// helpers
import { IUser } from '../types'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
})

export const UserModel = mongoose.model<IUser>('User', userSchema, 'users')
