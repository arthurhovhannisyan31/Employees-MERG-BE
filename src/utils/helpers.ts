// deps
import { GraphQLError } from 'graphql'
import { NextFunction, Request, Response } from 'express'
// model
import { IAuthRequest } from '../models/auth'
import { ErrorMessages, errorTypeMap } from '../constants'
import { ErrorType } from '../models/common'

export const dateToISOString = (date: string): string =>
  new Date(date).toISOString()

export const authCheck = (req: IAuthRequest): void => {
  if (!req.session.userId) {
    throw new Error(ErrorMessages.Unauthorized)
  }
}

export const getErrorCode = (
  errorName: typeof ErrorMessages[keyof typeof ErrorMessages]
): ErrorType => errorTypeMap[errorName]

export const customFormatError = (
  err: GraphQLError
): GraphQLError | ErrorType => {
  if (err.message in ErrorMessages) {
    const error = getErrorCode(
      ErrorMessages[err.message as keyof typeof ErrorMessages]
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
  next: NextFunction
): Response | void => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  return next()
}
