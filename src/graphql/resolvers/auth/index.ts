// deps
import { v4 as v4uuid } from 'uuid'
import addHours from 'date-fns/addHours'
// model
import { User, UserModel } from '../../../models/user'
import { ForgetPasswordModel } from '../../../models/forgetPassword'
import { CreateUserInput } from '../../../models/user'
import {
  AuthData,
  AuthInput,
  UserCredentials,
  UserResponse,
} from '../../../models/auth'
import { QueryContext } from '../../../models/common'
// helpers
import { authCheck } from '../../../utils/helpers'
import { verifyPassword, hashPassword } from './helpers'
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../../../constants'
import { getUserResponseErrors, isEmailValid } from '../../../utils/error'

export const createUser = async (
  { userInput: { email, password } }: CreateUserInput,
  { req }: QueryContext
): Promise<UserResponse<User>> => {
  if (!isEmailValid) {
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

// export const updatePassword = (
//   { email, password }: AuthInput,
//   { req }: QueryContext
// ): Promise<UserResponse<AuthData>> => {
//
// }

export const forgotPassword = async ({
  email,
}: AuthInput): Promise<UserResponse<AuthData> | void> => {
  if (!isEmailValid) {
    return getUserResponseErrors([['email', `Email is not valid`]])
  }
  const user = await UserModel.findOne({ email })
  if (!user) {
    return
  }
  const forgottenPassword = new ForgetPasswordModel({
    key: `${FORGET_PASSWORD_PREFIX}-${v4uuid()}`,
    userId: user._id,
    expiration: addHours(Date.now(), 1),
  })
  await forgottenPassword.save()
  // todo send email
}

export const login = async (
  { email, password }: AuthInput,
  { req }: QueryContext
): Promise<UserResponse<AuthData>> => {
  if (!isEmailValid) {
    return getUserResponseErrors([['email', `Email is not valid`]])
  }
  const user = await UserModel.findOne({ email })
  if (!user) {
    return getUserResponseErrors([
      ['email', `User with email ${email} does not exist`],
    ])
  }
  const isPasswordCorrect = await verifyPassword(password, user.password)
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
