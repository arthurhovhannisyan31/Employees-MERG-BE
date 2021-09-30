import addHours from 'date-fns/addHours'
import { v4 as v4uuid } from 'uuid'

import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../../../constants'
import { UserModel } from '../../../models'
import { AuthData, UserCredentials, UserResponse } from '../../../models/auth'
import { QueryContext } from '../../../models/common'
import { ForgottenPasswordModel } from '../../../models/forgetPassword'
import {
  RootMutationCreateUserArgs,
  RootQueryForgottenPasswordArgs,
  RootQueryLoginArgs,
  // RootQueryUpdatePasswordArgs,
  User,
} from '../../../models/generated'
import { getUserResponseErrors, isEmailValid } from '../../../utils/error'
import { authCheck } from '../../../utils/helpers'
import { sendEmail } from '../../../utils/sendEmail'
import {
  verifyPassword,
  hashPassword,
  getRestorePasswordTemplate,
} from './helpers'

export const createUser = async (
  { input: { email, password } }: RootMutationCreateUserArgs,
  { req }: QueryContext
): Promise<UserResponse<User>> => {
  if (!isEmailValid(email)) {
    return getUserResponseErrors([['email', `Email is not valid`]])
  }
  const existingUser = await UserModel.findOne({ email })
  if (existingUser) {
    return getUserResponseErrors([
      ['email', `User with email ${email} exists already`],
    ])
  }
  const hashedPassword = await hashPassword(password)
  const user = new UserModel({
    email,
    password: hashedPassword,
  })
  const result = await user.save()
  req.session.userId = user.id
  return {
    data: {
      _id: result._id,
      email: result.email,
      password: '',
    },
  }
}

// export const updatePassword = async ({
//   input: { password, key },
// }: RootQueryUpdatePasswordArgs): Promise<boolean> => {
// check if has entry
// get user id from enty
// update password
// remove entry
// TODO continue here
// if (!isEmailValid) {
//   return getUserResponseErrors([['email', `Email is not valid`]])
// }
// const forgottenPasswordToken = await ForgottenPasswordModel.findOne({
//   key: `${FORGET_PASSWORD_PREFIX}-${token}`,
// })
// // if expired
// if (
//   !forgottenPasswordToken ||
//   !isForgottenTokenExpired(forgottenPasswordToken)
// ) {
//   return getUserResponseErrors([['token', 'Token expired']])
// }
// const user = UserModel.find({ _id: forgottenPasswordToken.userId })
// if (!user) {
//   return getUserResponseErrors([['token', 'User not found']])
// }
// return true
// }

export const forgottenPassword = async ({
  input: { email },
}: RootQueryForgottenPasswordArgs): Promise<UserResponse<AuthData> | void> => {
  if (!isEmailValid(email)) {
    return getUserResponseErrors([['email', `Email is not valid`]])
  }
  const user = await UserModel.findOne({ email })
  if (!user) return
  const forgottenPassword = new ForgottenPasswordModel({
    key: `${FORGET_PASSWORD_PREFIX}-${v4uuid()}`,
    userId: user._id,
    expiration: addHours(Date.now(), 1).toISOString(),
  })
  await forgottenPassword.save()
  await sendEmail(
    [email],
    getRestorePasswordTemplate(
      forgottenPassword.key,
      process.env.NODEMAILER_BASE_URL
    )
  )
  return
}

export const login = async (
  { input: { email, password } }: RootQueryLoginArgs,
  { req }: QueryContext
): Promise<UserResponse<AuthData>> => {
  if (!isEmailValid(email)) {
    return getUserResponseErrors([['email', `Email is not valid`]])
  }
  const user = await UserModel.findOne({ email })
  if (!user) {
    return getUserResponseErrors([
      ['email', `User with email ${email} does not exist`],
    ])
  }
  const isPasswordCorrect = await verifyPassword(
    password,
    user?.password as string
  )
  if (!isPasswordCorrect) {
    return getUserResponseErrors([['password', 'Password is incorrect']])
  }
  req.session.userId = user.id
  return {
    data: {
      userCredentials: {
        _id: user.id,
        email: user.email,
      },
    },
  }
}

export const logout = (
  _: never,
  { req, res }: QueryContext
): Promise<boolean> => {
  return new Promise((resolve) =>
    req.session.destroy((err) => {
      res.clearCookie(COOKIE_NAME)
      if (err) {
        resolve(false)
        return
      }
      resolve(true)
    })
  )
}

export const me = async (
  _: unknown,
  { req }: QueryContext
): Promise<UserResponse<UserCredentials> | undefined> => {
  authCheck(req)
  const user = await UserModel.findOne({ _id: req.session.userId })
  if (!user) {
    return
  }
  return {
    data: {
      _id: user.id,
      email: user.email,
    },
  }
}
