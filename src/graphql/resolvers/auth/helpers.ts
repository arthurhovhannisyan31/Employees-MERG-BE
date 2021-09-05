// deps
import { hash, compare } from 'bcryptjs'
import DataLoader from 'dataloader'
import { Document } from 'mongoose'
import dateHours from 'date-fns/addHours'
// model
import { UserModel } from '../../../models'
import { User, ForgottenPassword } from '../../../models/generated'

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
        <div id="root" style="text-align: center">
          <p style="font-size: 1.5rem">Hello!</p>
          <p style="font-size: 1.2rem">You are receiving this email because we received a password reset request for your account.</p>
          <a rel="nofollow" href="${origin}/change-password/${token}"><p style="font-size: 1.2rem; font-weight: bold; margin: 0 auto">Reset Password</p></a>
          <p style="font-size: 1.2rem">If you did not request a password reset, no further action is required.</p>
          <p >If you're having trouble opening the "Reset Password" link, copy and past the URL below to your web browser</p>
          ${origin}/change-password/${token} 
        </div>
      </body>
    </html>
  `

export const isForgottenTokenExpired = (
  token: ForgottenPassword & Document
): boolean => {
  return new Date(token.expiration) <= dateHours(Date.now(), 1)
}
