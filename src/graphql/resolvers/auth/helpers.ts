// deps
import { sign, verify } from 'jsonwebtoken'
import { hash, compare } from 'bcryptjs'
import DataLoader from 'dataloader'
// model
import { User } from '../../../models'
import { IUser } from '../../../models/user'
import { IAuthCheck } from '../../middleware/auth'
// helpers
import { CONFIG } from '../../../constants/config'

export const userLoader = new DataLoader((userIds) =>
  getUsers(userIds as string[]),
)

export const getUsers = async (userIds: string[]) => {
  try {
    return await User.find({ _id: { $in: userIds } })
  } catch (err) {
    throw err
  }
}
export const getSingleUser = async (userId: string) => {
  try {
    const user = await userLoader.load(userId.toString())
    if (!user) throw new Error('User not found')
    return {
      ...user,
      _id: user?._id,
      email: user?.email,
      password: '',
    }
  } catch (err) {
    throw err
  }
}

export const getSecretKey = () => CONFIG.AUTH_SECRET_KEY || ''

export const verifyPassword = async (
  passwordAttempt: string,
  hashedPassword: string,
) => await compare(passwordAttempt, hashedPassword)

export const verifyToken = (token: string): Pick<IAuthCheck, 'userId'> => {
  return verify(token, getSecretKey()) as Pick<IAuthCheck, 'userId'>
}

export const generateToken = ({ id, email }: IUser): string => {
  return sign({ userId: id, email }, getSecretKey(), {
    expiresIn: '1d',
    algorithm: 'HS256',
  })
}

export const hashPassword = async (password: string): Promise<string> =>
  await hash(password, 12)
