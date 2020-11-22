// deps
import DataLoader from 'dataloader'
// local
import { Event } from '../../../models'
import { getSingleUser } from '../auth/helpers'
// helpers
import { dateToISOString } from '../../utils/helpers'
import { IEvent } from '../../../models/events'

// @ts-ignore
export const eventLoader = new DataLoader((eventIds: string[]) =>
  getEvents(eventIds)
)

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
export const transformEvent = (event: IEvent) => {
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
