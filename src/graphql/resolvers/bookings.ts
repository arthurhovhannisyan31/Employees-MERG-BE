// deps
// local
import { BookingModel as Booking } from '../../models/booking'
import { EventModel as Event } from '../../models/events'
// helpers
import { transformBooking, transformEvent } from './helpers'
import { IAuthRequest } from '../../types'
import { authCheck } from '../utils/helpers'

export const bookEvent = async (
  { eventId }: { eventId: string },
  req: IAuthRequest
) => {
  authCheck(req)
  try {
    const fetchedEvent = await Event.findOne({ _id: eventId })
    if (!fetchedEvent) {
      throw new Error(`Event ${eventId} not found`)
    }
    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent._id,
    })
    const result = await booking.save()
    // @ts-ignore
    return transformBooking(result)
  } catch (err) {
    throw err
  }
}

export const bookings = async (_: never, req: IAuthRequest) => {
  try {
    authCheck(req)
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
  req: IAuthRequest
) => {
  authCheck(req)
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
