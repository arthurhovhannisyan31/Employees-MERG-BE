// deps
import { GraphQLError } from 'graphql'
import { NextFunction, Request, Response } from 'express'
// model
import { IAuthRequest } from '../models/auth'
import { EErrorName, errorTypeMap } from '../constants/error'

export const dateToISOString = (date: string): string =>
  new Date(date).toISOString()

export const authCheck = (req: IAuthRequest) => {
  if (!req.isAuth) {
    throw new Error(EErrorName.UNAUTHORIZED)
  }
}

export const getErrorCode = (
  errorName: typeof EErrorName[keyof typeof EErrorName],
) => errorTypeMap[errorName]

export const customFormatError = (err: GraphQLError) => {
  if (err.message in EErrorName) {
    const error = getErrorCode(
      EErrorName[err.message as keyof typeof EErrorName],
    )
    return {
      message: error.message,
      statusCode: error.statusCode,
    }
  }
  return err
}

export const customCorsCheck = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  return next()
}
