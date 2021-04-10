// deps
import { Request } from 'express'
// model
import { IUser } from './user'

export type TLoginInput = Pick<IUser, 'email' | 'password'>
export type UserCredentials = Pick<IUser, 'email' | '_id'>
export interface IAuthData {
  userCredentials: UserCredentials
  token: string
}
export interface IAuthRequest extends Request {
  isAuth: boolean
  userId: string
}
