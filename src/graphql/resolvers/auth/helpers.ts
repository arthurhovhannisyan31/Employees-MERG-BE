// deps
import { hash, compare } from 'bcryptjs'
import DataLoader from 'dataloader'
import { Document } from 'mongoose'
import dateHours from 'date-fns/addHours'
// model
import { UserModel } from '../../../models'
import { User } from '../../../models/user'
import { ForgetPassword } from '../../../models/forgetPassword'

export const userLoader = new DataLoader(
  (userIds): Promise<User[]> => getUsers(userIds as string[])
)

export const getUsers = async (userIds: string[]): Promise<User[]> => {
  try {
    return await UserModel.find({ _id: { $in: userIds } })
  } catch (err) {
    throw err
  }
}
export const getSingleUser = async (userId: string): Promise<User> => {
  const user = await userLoader.load(userId.toString())
  if (!user) throw new Error('User not found')
  return {
    ...user,
    _id: user?._id,
    email: user?.email,
    password: '',
  }
}

export const verifyPassword = async (
  passwordAttempt: string,
  hashedPassword: string
): Promise<boolean> => await compare(passwordAttempt, hashedPassword)

export const hashPassword = async (password: string): Promise<string> =>
  await hash(password, 12)

export const getRestorePasswordTemplate = (token: string): string =>
  `<a href="window.location.host/change-password/${token}">Reset password</a>`

export const isForgetTokenExpired = (
  token: ForgetPassword & Document
): boolean => {
  return new Date(token.expiration) <= dateHours(Date.now(), 1)
}
