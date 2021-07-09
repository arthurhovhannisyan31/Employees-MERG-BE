// deps
import { GraphQLError } from 'graphql'
import { NextFunction, Request, Response } from 'express'
// model
import { AuthRequest } from '../models/auth'
import { ErrorType, errorResponses } from '../constants'
import { ErrorProps } from '../models/common'

export const dateToISOString = (date: string): string =>
  new Date(date).toISOString()

export const authCheck = (req: AuthRequest): void => {
  if (!req.session.userId) {
    throw new Error(ErrorType.Unauthorized)
  }
}

export const getErrorCode = (errorName: ErrorType): ErrorProps =>
  errorResponses[errorName]

export const customFormatError = (
  err: GraphQLError
): GraphQLError | ErrorProps => {
  if (err.message in ErrorType) {
    const error = getErrorCode(err.message as ErrorType)
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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  return next()
}
