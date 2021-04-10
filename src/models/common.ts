// deps
import { Response } from 'express'
// model
import { IAuthRequest } from './auth'
import { ErrorCodes, ErrorMessages } from '../constants/error'

export interface QueryOptions {
  req: IAuthRequest
  res: Response
}

export interface ErrorType {
  message: ErrorMessages
  statusCode: ErrorCodes
}
