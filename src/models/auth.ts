import { Request } from 'express'
import { Session } from 'express-session'

import { FieldError } from './common'
import { User } from './generated'

export type ChangePasswordInput = {
  token: string
  newPassword: string
}
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
