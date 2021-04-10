import { __prod__ } from './config'
import { CookieOptions } from 'express'

export const cookieMaxAge = 1000 * 60 * 60 * 24

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: cookieMaxAge,
  secure: __prod__,
}
