// deps
import { Request, Response, NextFunction } from 'express'
// helpers
import { verifyToken } from '../resolvers/auth/helpers'

export interface IAuthCheck extends Request {
  isAuth?: boolean
  userId?: string
}
export const isAuth = (
  req: IAuthCheck,
  _: Response,
  next: NextFunction,
): void => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    req.isAuth = false
    return next()
  }
  const token = authHeader.split(' ')?.[1]
  if (!token) {
    req.isAuth = false
    return next()
  }
  let decodedToken: Pick<IAuthCheck, 'userId'>
  try {
    decodedToken = verifyToken(token)
  } catch (err) {
    req.isAuth = false
    return next()
  }
  if (!decodedToken) {
    req.isAuth = false
    return next()
  }
  req.isAuth = true
  req.userId = decodedToken.userId as string
  return next()
}
