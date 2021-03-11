// deps
import mongoose, { Document, Schema } from 'mongoose'
// local
// helpers

export interface IUser extends Document {
  _id: string
  email: string
  password: string
}

export interface ICreateUserInput {
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

export const UserModel = mongoose.model<IUser>('User', userSchema, 'users')
