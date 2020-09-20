// deps
import { Request } from 'express'
// local
import { EventModel as Event } from '../../models/events'
import { UserModel as User } from '../../models/user'
// helpers
import { transformEvent } from './helpers'
import { IEventInput } from '../../types'

export const events = async () => {
  try {
    const result = await Event.find()
    // @ts-ignore
    return result.map(transformEvent)
  } catch (err) {
    throw err
  }
}

export const createEvent = async (
  { eventInput: { date, description, price, title } }: IEventInput,
  req: Request
) => {
  // @ts-ignore
  if (!req.isAuth) {
    throw new Error('Unauthenticated request')
  }
  try {
    const event = new Event({
      title,
      description,
      price: +price,
      date: new Date(date),
      // @ts-ignore
      creator: req.userId,
    })
    // @ts-ignore
    const result = await event.save()
    // @ts-ignore
    const user = await User.findById(req.userId)
    if (!user) {
      throw new Error('User not found')
    }
    // @ts-ignore
    user.createdEvents.push(event)
    await user.save()
    // @ts-ignore
    return transformEvent(result)
  } catch (err) {
    throw err
  }
}
