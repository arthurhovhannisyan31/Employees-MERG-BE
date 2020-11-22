// deps
import mongoose, { Document, Schema } from 'mongoose'
// local
// helpers

export interface IBooking extends Document {
  id: string
  event: string
  user: string
  createdAt: string
  updatedAt: string
}

export interface IBookingID {
  bookingId: string
}

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

export const BookingModel = mongoose.model('Booking', bookingSchema, 'bookings')
