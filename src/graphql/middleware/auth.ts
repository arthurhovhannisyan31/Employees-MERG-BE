// deps
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface IAuthCheck extends Request {
  isAuth?: boolean
  userId?: string
}
export const isAuth = (req: IAuthCheck, _: Response, next: NextFunction) => {
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
  const secretKey = process.env.AUTH_SECRET_KEY || ''
  let decodedToken
  try {
    decodedToken = jwt.verify(token, secretKey) as Pick<IAuthCheck, 'userId'>
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
