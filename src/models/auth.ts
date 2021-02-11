// deps
import { Request } from 'express'
// model
import {IUser} from './user'

// helpers

export type TLoginInput = Pick<IUser, 'email'|"password">
export type UserCredentials = Pick<IUser, 'email'|"id">
export interface IAuthData {
  userCredentials: UserCredentials
  token: string
}
export interface IAuthRequest extends Request {
  isAuth: boolean
  userId: string
}
