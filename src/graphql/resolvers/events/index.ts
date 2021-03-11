// local
import { EventModel as Event } from '../../../models/events'
import { UserModel as User } from '../../../models/user'
// helpers
import { transformEvent } from './helpers'
import { IAuthRequest } from '../../../models/auth'
import { ICreateEventInput } from '../../../models/events'
import { authCheck } from '../../../utils/helpers'

export const events = async (_: never, req: IAuthRequest) => {
  authCheck(req)
  try {
    const result = await Event.find()
    return result.map(transformEvent)
  } catch (err) {
    throw err
  }
}

export const createEvent = async (
  { eventInput: { date, description, price, title } }: ICreateEventInput,
  req: IAuthRequest,
) => {
  authCheck(req)
  try {
    const event = new Event({
      title,
      description,
      price: +price,
      date: new Date(date),
      creator: req.userId,
    })
    const result = await event.save()
    const user = await User.findById(req.userId)
    if (!user) {
      throw new Error('User not found')
    }
    user.createdEvents.push(event)
    await user.save()
    return transformEvent(result)
  } catch (err) {
    throw err
  }
}
