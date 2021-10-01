import { CookieOptions } from 'express'

import { __PROD__, CONNECT_CONFIG } from './config'

export const COOKIE_NAME = process.env.COOKIE_NAME || ''
export const RESET_PASSWORD_PREFIX = 'reset-password'
export const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: COOKIE_MAX_AGE,
  sameSite: 'lax',
  secure: __PROD__,
}

export const getSecretKey = (): string => CONNECT_CONFIG.AUTH_SECRET_KEY || ''
