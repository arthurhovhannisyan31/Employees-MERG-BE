import addHours from 'date-fns/addHours'
import isAfter from 'date-fns/isAfter'
import { v4 as v4uuid } from 'uuid'

import { COOKIE_NAME, RESET_PASSWORD_PREFIX } from '../../../constants'
import { UserModel } from '../../../models'
import { AuthData, UserCredentials, UserResponse } from '../../../models/auth'
import { QueryContext } from '../../../models/common'
import { ForgottenPasswordModel } from '../../../models/forgetPassword'
import {
  ForgottenPassword,
  RootMutationCreateUserArgs,
  RootQueryForgottenPasswordArgs,
  RootQueryLoginArgs,
  RootQueryResetPasswordLinkValidationArgs,
  RootQueryUpdatePasswordArgs,
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

export const updatePassword = async ({
  input: { password, key },
}: RootQueryUpdatePasswordArgs): Promise<UserResponse<boolean>> => {
  if (!password)
    return getUserResponseErrors([['password', `Password is not provided!`]])

  const keyValidation: UserResponse<ForgottenPassword> =
    await validateResetPasswordLink({
      input: { key },
    })

  if (keyValidation.errors?.length) {
    return {
      errors: keyValidation.errors,
    }
  }
  if (!keyValidation.data)
    return getUserResponseErrors([['link', `Unhandled error!`]])

  const user = await UserModel.findOneAndUpdate(
    {
      _id: keyValidation.data.userId,
    },
    {
      password,
    }
  )

  if (!user) return getUserResponseErrors([['user', 'User not found!']])

  await ForgottenPasswordModel.deleteOne({
    key: keyValidation.data.key,
  })

  return {
    data: true,
  }
}

export const forgottenPassword = async ({
  input: { email },
}: RootQueryForgottenPasswordArgs): Promise<UserResponse<AuthData> | void> => {
  if (!isEmailValid(email)) {
    return getUserResponseErrors([['email', `Email is not valid`]])
  }

  const user = await UserModel.findOne({ email })
  if (!user) return
  const forgottenPassword = new ForgottenPasswordModel({
    key: `${RESET_PASSWORD_PREFIX}-${v4uuid()}`,
    userId: user._id,
    expiration: addHours(Date.now(), 1).toISOString(),
  })
  await forgottenPassword.save()
  sendEmail(
    [email],
    getRestorePasswordTemplate(
      forgottenPassword.key,
      process.env.NODEMAILER_BASE_URL
    )
  )
}

export const validateResetPasswordLink = async ({
  input: { key },
}: RootQueryResetPasswordLinkValidationArgs): Promise<
  UserResponse<ForgottenPassword>
> => {
  if (!key) {
    return getUserResponseErrors([['key', `Key is missing!`]])
  }
  const resetQuery = await ForgottenPasswordModel.findOne({
    key: `${RESET_PASSWORD_PREFIX}-${key}`,
  })
  if (!resetQuery) {
    return getUserResponseErrors([['key', `Key is not valid!`]])
  }
  if (isAfter(new Date(resetQuery.expiration), Date.now())) {
    return getUserResponseErrors([['expiration', `Link is expired!`]])
  }
  return {
    data: resetQuery,
  }
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
