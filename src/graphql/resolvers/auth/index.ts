// deps
import { v4 as v4uuid } from 'uuid'
import addHours from 'date-fns/addHours'
// model
import { User, UserModel } from '../../../models/user'
import { ForgetPasswordModel } from '../../../models/forgetPassword'
import { CreateUserInput } from '../../../models/user'
import { AuthData, UserCredentials, UserResponse } from '../../../models/auth'
import { QueryContext } from '../../../models/common'
import { RootQueryForgotPasswordArgs } from '../../../models/generated'
// helpers
import { authCheck } from '../../../utils/helpers'
import {
  verifyPassword,
  hashPassword,
  getRestorePasswordTemplate,
} from './helpers'
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../../../constants'
import { getUserResponseErrors, isEmailValid } from '../../../utils/error'
import { sendEmail } from '../../../utils/sendEmail'
import { regExp } from '../../../constants/regExp'

export const createUser = async (
  { userInput: { email, password } }: CreateUserInput,
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

// export const restorePassword = async (
//   { newPassword, token }: ChangePasswordInput,
//   { req }: QueryContext
// ): Promise<UserResponse<AuthData>> => {
//   if (!isEmailValid) {
//     return getUserResponseErrors([['email', `Email is not valid`]])
//   }
//   const forgottenPasswordToken = await ForgetPasswordModel.findOne({
//     key: `${FORGET_PASSWORD_PREFIX}-${token}`,
//   })
//   // if expired
//   if (
//     !forgottenPasswordToken ||
//     !isForgetTokenExpired(forgottenPasswordToken)
//   ) {
//     return getUserResponseErrors([['token', 'Token expired']])
//   }
//   const user = UserModel.find({ _id: forgottenPasswordToken.userId })
//   if (!user) {
//     return getUserResponseErrors([['token', 'User not found']])
//   }
// }

export const forgotPassword = async (
  { input: { email } }: RootQueryForgotPasswordArgs,
  { req }: QueryContext
): Promise<UserResponse<AuthData> | void> => {
  console.log('test')
  console.log('test')
  console.log(email, regExp.email, regExp.email.test(email))
  console.log(req.baseUrl)
  console.log(req.hostname)
  console.log(req.ip)
  console.log(req.ips)
  console.log(req.url)
  console.log(req.originalUrl)
  console.log(req.headers)
  console.log(req.headers.origin)

  if (!isEmailValid(email)) {
    return getUserResponseErrors([['email', `Email is not valid`]])
  }
  const user = await UserModel.findOne({ email })
  if (!user) {
    return
  }
  const forgottenPassword = new ForgetPasswordModel({
    key: `${FORGET_PASSWORD_PREFIX}-${v4uuid()}`,
    userId: user._id,
    expiration: addHours(Date.now(), 1).toISOString(),
  })
  await forgottenPassword.save()
  await sendEmail([email], getRestorePasswordTemplate(forgottenPassword.key))
  return
}

export const login = async (
  { email, password }: Pick<User, 'email' | 'password'>,
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
