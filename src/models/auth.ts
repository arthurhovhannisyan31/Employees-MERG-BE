// deps
import { Request } from 'express'
import { Session } from 'express-session'
// model
import { User } from './user'
import { FieldError } from './common'

export type AuthInput = Pick<User, 'email' | 'password'>
export type UserCredentials = Pick<User, 'email' | '_id'>
export interface AuthData {
  userCredentials: UserCredentials
}
export interface AuthSession extends Session {
  userId: string
}
export interface AuthRequest extends Request {
  session: AuthSession
}
export interface UserResponse<T> {
  errors?: FieldError[]
  data?: T
}
