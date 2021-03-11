// deps
// local
import { Booking, Event } from '../../../models'
// helpers
import { transformBooking } from './helpers'
import { transformEvent } from '../events/helpers'
import { IAuthRequest } from '../../../models/auth'
import { authCheck } from '../../../utils/helpers'
import { IEvent } from '../../../models/events'

export const bookEvent = async (
  { eventId }: { eventId: string },
  req: IAuthRequest,
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
      return transformBooking(booking)
    })
  } catch (err) {
    throw err
  }
}

export const cancelBooking = async (
  { bookingId }: { bookingId: string },
  req: IAuthRequest,
) => {
  authCheck(req)
  try {
    const booking = await Booking.findById(bookingId).populate('event')
    const event = transformEvent((booking?.event as never) as IEvent)
    await Booking.deleteOne({ _id: bookingId })
    return event
  } catch (err) {
    throw err
  }
}
