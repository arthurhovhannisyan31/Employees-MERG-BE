// deps
import DataLoader from 'dataloader'
// local
import { User } from '../../../models'
import { eventLoader } from '../events/helpers'
// helpers

// @ts-ignore
export const userLoader = new DataLoader((userIds: string[]) =>
  getUsers(userIds)
)

export const getUsers = async (userIds: string[]) => {
  try {
    // @ts-ignore
    return await User.find({ _id: { $in: userIds } })
  } catch (err) {
    throw err
  }
}
export const getSingleUser = async (userId: string) => {
  try {
    const user = await userLoader.load(userId.toString())
    if (!user) throw new Error('User not found')
    return {
      ...user,
      _id: user?._id,
      email: user?.email,
      password: '',
      // @ts-ignore
      createdEvents: () => eventLoader.loadMany(user.createdEvents),
    }
  } catch (err) {
    throw err
  }
}
