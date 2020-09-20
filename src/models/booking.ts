import mongoose, { Schema } from 'mongoose'

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
