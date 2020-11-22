// deps
import mongoose, { Document, Schema } from 'mongoose'
// local
// helpers
import { IEvent } from './events'

export interface IUser extends Document {
  _id: string
  email: string
  password: string
  createdEvents: IEvent[]
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
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
})

export const UserModel = mongoose.model<IUser>('User', userSchema, 'users')
