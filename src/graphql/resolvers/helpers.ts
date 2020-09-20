// global imports
// local imports
import { IEvent, IUser, IBooking } from '../../types'
import { EventModel as Event } from '../../models/events'
import { UserModel as User } from '../../models/user'
import { dateToISOString } from '../helpers/date'
import DataLoader from 'dataloader'

// @ts-ignore
const eventLoader = new DataLoader((eventIds: string[]) => {
  return getEvents(eventIds)
})

// @ts-ignore
const userLoader = new DataLoader((userIds: string[]) => {
  return getUsers(userIds)
})

export const getEvents = async (eventIds: string[]): Promise<IEvent[]> => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    // @ts-ignore
    events.sort((a: IEvent, b: IEvent) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      )
    })
    // @ts-ignore
    return events.map(transformEvent)
  } catch (err) {
    throw err
  }
}

export const getSingleEvent = async (eventId: string): Promise<IEvent> => {
  try {
    const event = await eventLoader.load(eventId.toString())
    if (!event) {
      throw new Error(`Event ${eventId} not found`)
    }
    // @ts-ignore
    return event
  } catch (err) {
    throw err
  }
}

export const getUsers = async (userIds: string[]): Promise<IUser[]> => {
  try {
    // @ts-ignore
    return await User.find({ _id: { $in: userIds } })
  } catch (err) {
    throw err
  }
}

export const getSingleUser = async (userId: string): Promise<IUser> => {
  try {
    const user = await userLoader.load(userId.toString())
    if (!user) throw new Error('User not found')
    const createdEventsIds = user.createdEvents.map((event) => event.toString())
    return {
      ...user,
      // @ts-ignore
      _id: user?._id,
      // @ts-ignore
      email: user?.email,
      // @ts-ignore
      password: '',
      // @ts-ignore
      createdEvents: () => eventLoader.loadMany(createdEventsIds),
    }
  } catch (err) {
    throw err
  }
}

export const transformEvent = (event: IEvent): IEvent => {
  return {
    ...event,
    _id: event._id,
    title: event.title,
    description: event.description,
    price: event.price,
    date: dateToISOString(event.date),
    // @ts-ignore
    creator: getSingleUser(event.creator),
  }
}

export const transformBooking = (booking: IBooking): IBooking => ({
  ...booking,
  _id: booking.id,
  // @ts-ignore
  user: getSingleUser(booking.user),
  // @ts-ignore
  event: getSingleEvent(booking.event),
  // @ts-ignore
  createdAt: dateToISOString(booking.createdAt),
  // @ts-ignore
  updatedAt: dateToISOString(booking.updatedAt),
})

export const transformDepartment = (department: any) => {
  return department
}
