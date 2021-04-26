// deps
import { CookieOptions } from 'express'
// helpers
import { __PROD__, CONNECT_CONFIG } from './config'

export const COOKIE_NAME = process.env.COOCKIE_NAME || ''
export const FORGET_PASSWORD_PREFIX = 'forget-password'
export const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: COOKIE_MAX_AGE,
  secure: __PROD__,
  sameSite: 'lax',
}

export const getSecretKey = (): string => CONNECT_CONFIG.AUTH_SECRET_KEY || ''
