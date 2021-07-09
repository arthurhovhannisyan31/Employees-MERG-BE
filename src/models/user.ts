// deps
import mongoose, { Document, Schema } from 'mongoose'

export interface User {
  _id: string
  email: string
  password: string
}

export interface CreateUserInput {
  userInput: {
    email: string
    password: string
  }
}

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
