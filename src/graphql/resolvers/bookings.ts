// deps
import { Request } from 'express'
// local
import { BookingModel as Booking } from '../../models/booking'
import { EventModel as Event } from '../../models/events'
// helpers
import { transformBooking, transformEvent } from './helpers'

export const bookEvent = async (
  { eventId }: { eventId: string },
  req: Request
) => {
  // @ts-ignore
  if (!req.isAuth) {
    throw new Error('Unauthenticated request')
  }
  try {
    const fetchedEvent = await Event.findOne({ _id: eventId })
    if (!fetchedEvent) {
      throw new Error(`Event ${eventId} not found`)
    }
    const booking = new Booking({
      // @ts-ignore
      user: req.userId,
      // @ts-ignore
      event: fetchedEvent._id,
    })
    const result = await booking.save()
    // @ts-ignore
    return transformBooking(result)
  } catch (err) {
    throw err
  }
}

export const bookings = async (_: never, req: Request) => {
  try {
    // @ts-ignore
    if (!req.isAuth) {
      throw new Error('Unauthenticated request')
    }
    // @ts-ignore
    const bookings = await Booking.find({ user: req.userId })
    return bookings.map((booking) => {
      // @ts-ignore
      return transformBooking(booking)
    })
  } catch (err) {
    throw err
  }
}

export const cancelBooking = async (
  { bookingId }: { bookingId: string },
  req: Request
) => {
  // @ts-ignore
  if (!req.isAuth) {
    throw new Error('Unauthenticated request')
  }
  try {
    const booking = await Booking.findById(bookingId).populate('event')
    // @ts-ignore
    const event = transformEvent(booking.event)
    await Booking.deleteOne({ _id: bookingId })
    return event
  } catch (err) {
    throw err
  }
}
