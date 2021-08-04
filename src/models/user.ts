// deps
import mongoose, { Document, Schema } from 'mongoose'
// model
import { User } from './generated'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export const UserModel = mongoose.model<User & Document>(
  'User',
  userSchema,
  'users'
)
