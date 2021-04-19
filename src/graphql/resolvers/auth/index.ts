// model
import { IUser, UserModel as User } from '../../../models/user'
import { ICreateUserInput } from '../../../models/user'
import { IAuthData, TLoginInput, UserCredentials } from '../../../models/auth'
import { QueryOptions } from '../../../models/common'
// helpers
import { authCheck } from '../../../utils/helpers'
import { verifyPassword, generateToken, hashPassword } from './helpers'
import { cookieOptions } from '../../../constants'

export const createUser = async (
  { userInput: { email, password } }: ICreateUserInput,
  { res }: QueryOptions,
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
  res.cookie('token', generateToken(user), cookieOptions)
  return {
    _id: result._id,
    email: result.email,
    password: '',
  }
}

export const login = async (
  { email, password }: TLoginInput,
  { res }: QueryOptions,
): Promise<IAuthData | Error> => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User does not exist')
  }
  const isEqual = await verifyPassword(password, user.password)
  if (!isEqual) {
    throw new Error('Password is incorrect')
  }
  res.cookie('token', generateToken(user), cookieOptions)
  return {
    userCredentials: {
      _id: user.id,
      email: user.email,
    },
    token: generateToken(user),
  }
}

export const logout = async () => {
  // req.session.destroy
}

export const me = async (
  _: unknown,
  { req }: QueryOptions,
): Promise<UserCredentials | Error> => {
  authCheck(req)
  const user = await User.findOne({ _id: req.userId })
  if (!user) {
    throw new Error('User does not exist')
  }
  return {
    _id: user.id,
    email: user.email,
  }
}
