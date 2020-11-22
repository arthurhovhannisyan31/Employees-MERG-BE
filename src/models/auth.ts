// deps
// local
import { Request } from 'express'
// helpers

export interface ILogin {
  email: string
  password: string
}
export interface IAuthData {
  userId: string
  token: string
  tokenExpiration: number
}
export interface IAuthRequest extends Request {
  isAuth: boolean
  userId: string
}
