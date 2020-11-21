// deps
// local
import { getSingleUser } from '../auth/helpers'
import { getSingleEvent } from '../events/helpers'
// helpers
import { IBooking } from '../../../types'
import { dateToISOString } from '../../utils/helpers'

export const transformBooking = (booking: IBooking) => ({
  ...booking,
  _id: booking.id,
  user: getSingleUser(booking.user),
  event: getSingleEvent(booking.event),
  createdAt: dateToISOString(booking.createdAt),
  updatedAt: dateToISOString(booking.updatedAt),
})
