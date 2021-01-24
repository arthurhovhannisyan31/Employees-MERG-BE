// deps
import { hash, compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
// local
import { UserModel as User } from '../../../models/user'
// helpers
import { ICreateUserInput } from '../../../models/user'
import { IAuthData, TLoginInput } from '../../../models/auth'

export const createUser = async ({
  userInput: { email, password },
}: ICreateUserInput) => {
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new Error('User exists already')
    }
    const hashedPassword = await hash(password, 12)
    const user = new User({
      email,
      password: hashedPassword,
    })
    const result = await user.save()
    return {
      _id: result._id,
      email: result.email,
      password: null,
    }
  } catch (err) {
    throw err
  }
}

export const login = async ({
  email,
  password,
}: TLoginInput): Promise<IAuthData | Error> => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User does not exist')
  }
  const isEqual = await compare(password, user.password)
  if (!isEqual) {
    throw new Error('Password is incorrect')
  }
  const secretKey = process.env.AUTH_SECRET_KEY || ''
  const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
    expiresIn: '1h',
  })
  return {
    userCredentials: {
      id: user.id,
      email: user.email,
    },
    token,
    tokenExpiration: 1,
  }
}
