// global imports
// local imports
import { createUser, login } from './auth'
import { events, createEvent } from './events'
import { bookings, bookEvent, cancelBooking } from './bookings'
import { departments, createDepartment } from './departments'

export const resolvers = {
  // events
  events,
  bookings,
  createEvent,
  createUser,
  bookEvent,
  cancelBooking,
  login,
  // employees
  departments,
  createDepartment,
}
