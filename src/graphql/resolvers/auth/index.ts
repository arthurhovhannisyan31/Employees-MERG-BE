// model
import { IUser, UserModel as User } from '../../../models/user'
import { ICreateUserInput } from '../../../models/user'
import {
  IAuthData,
  TLoginInput,
  UserCredentials,
  UserResponse,
} from '../../../models/auth'
import { QueryContext } from '../../../models/common'
// helpers
import { authCheck } from '../../../utils/helpers'
import { verifyPassword, hashPassword } from './helpers'
import { COOKIE_NAME } from '../../../constants'

export const createUser = async (
  { userInput: { email, password } }: ICreateUserInput,
  { req }: QueryContext
): Promise<UserResponse<IUser>> => {
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return {
      errors: [
        {
          field: 'email',
          message: `User with email ${email} exists already`,
        },
      ],
    }
  }
  const hashedPassword = await hashPassword(password)
  const user = new User({
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

export const login = async (
  { email, password }: TLoginInput,
  { req }: QueryContext
): Promise<UserResponse<IAuthData>> => {
  const user = await User.findOne({ email })
  if (!user) {
    return {
      errors: [
        {
          field: 'email',
          message: `User with email ${email} does not exist`,
        },
      ],
    }
  }
  const isPasswordCorrect = await verifyPassword(password, user.password)
  if (!isPasswordCorrect) {
    return {
      errors: [
        {
          field: 'password',
          message: 'Password is incorrect',
        },
      ],
    }
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
  const user = await User.findOne({ _id: req.session.userId })
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
