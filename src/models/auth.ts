// deps
import { Request } from 'express'
import { Session } from 'express-session'
// model
import { IUser } from './user'

export type TLoginInput = Pick<IUser, 'email' | 'password'>
export type UserCredentials = Pick<IUser, 'email' | '_id'>
export interface IAuthData {
  userCredentials: UserCredentials
}
export interface IAuthSession extends Session {
  userId: string
}
export interface IAuthRequest extends Request {
  session: IAuthSession
}
