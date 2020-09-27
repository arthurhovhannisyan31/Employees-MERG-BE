// deps
// local
import { EventModel as Event } from '../../models/events'
import { UserModel as User } from '../../models/user'
// helpers
import { transformEvent } from './helpers'
import { IAuthRequest, ICreateEventInput } from '../../types'
import { authCheck } from '../utils/helpers'

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
  { eventInput: { date, description, price, title } }: ICreateEventInput,
  req: IAuthRequest
) => {
  authCheck(req)
  try {
    const event = new Event({
      title,
      description,
      price: +price,
      date: new Date(date),
      // @ts-ignore
      creator: req.userId,
    })
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
