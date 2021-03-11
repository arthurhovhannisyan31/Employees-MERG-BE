// deps
import DataLoader from 'dataloader'
// local
import { User } from '../../../models'
// helpers

export const userLoader = new DataLoader((userIds) =>
  getUsers(userIds as string[]),
)

export const getUsers = async (userIds: string[]) => {
  try {
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
    }
  } catch (err) {
    throw err
  }
}
