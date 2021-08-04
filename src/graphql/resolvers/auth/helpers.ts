// deps
import { hash, compare } from 'bcryptjs'
import DataLoader from 'dataloader'
import { Document } from 'mongoose'
import dateHours from 'date-fns/addHours'
// model
import { UserModel } from '../../../models'
import { User, ForgotPassword } from '../../../models/generated'

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

export const getRestorePasswordTemplate = (
  token: string,
  origin = ''
): string =>
  `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        name="viewport"
        />
        <meta content="ie=edge" http-equiv="X-UA-Compatible" />
        <title>Document</title>
      </head>
      <body>
        <div id="root">
          Please open the link: ${origin}/change-password/${token}
          <a rel="nofollow" href="${origin}/change-password/${token}">Reset password</a>
        </div>
      </body>
    </html>
  `

export const isForgotTokenExpired = (
  token: ForgotPassword & Document
): boolean => {
  return new Date(token.expiration) <= dateHours(Date.now(), 1)
}
