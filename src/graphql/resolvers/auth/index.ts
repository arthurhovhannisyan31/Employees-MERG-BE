// model
import { IUser, UserModel as User } from '../../../models/user'
import { ICreateUserInput } from '../../../models/user'
import { IAuthData, TLoginInput, UserCredentials } from '../../../models/auth'
import { QueryContext } from '../../../models/common'
// helpers
import { authCheck } from '../../../utils/helpers'
import { verifyPassword, hashPassword } from './helpers'
import { COOKIE_NAME } from '../../../constants'

export const createUser = async (
  { userInput: { email, password } }: ICreateUserInput,
  { req }: QueryContext,
): Promise<IUser> => {
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error('User exists already')
  }
  const hashedPassword = await hashPassword(password)
  const user = new User({
    email,
    password: hashedPassword,
  })
  const result = await user.save()
  req.session.userId = user.id
  return {
    _id: result._id,
    email: result.email,
    password: '',
  }
}

export const login = async (
  { email, password }: TLoginInput,
  { req }: QueryContext,
): Promise<IAuthData | Error> => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User does not exist')
  }
  const isPasswordCorrect = await verifyPassword(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('Password is incorrect')
  }
  req.session.userId = user.id
  return {
    userCredentials: {
      _id: user.id,
      email: user.email,
    },
  }
}

export const logout = (
  _: never,
  { req, res }: QueryContext,
): Promise<boolean> => {
  return new Promise((resolve) =>
    req.session.destroy((err) => {
      res.clearCookie(COOKIE_NAME)
      if (err) {
        console.log(`session.destroy failed, error: ${err}`)
        resolve(false)
        return
      }
      resolve(true)
    }),
  )
}

export const me = async (
  _: unknown,
  { req }: QueryContext,
): Promise<UserCredentials | Error> => {
  authCheck(req)
  const user = await User.findOne({ _id: req.session.userId })
  if (!user) {
    throw new Error('User does not exist')
  }
  return {
    _id: user.id,
    email: user.email,
  }
}
