// deps
import mongoose, { Document, Schema } from 'mongoose'
// local
// helpers
import { IUser } from './user'

export interface IEvent extends Document {
  _id: string
  title: string
  description: string
  price: number
  date: string
  creator: IUser
}

export interface IEventID {
  eventId: string
}

export interface ICreateEventInput {
  eventInput: {
    title: string
    description: string
    price: number
    date: string
  }
}

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

export const EventModel = mongoose.model<IEvent>('Event', eventSchema, 'events')
