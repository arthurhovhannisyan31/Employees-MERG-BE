// deps
import { Response } from 'express'
// model
import { IAuthRequest } from './auth'
import { ErrorCodes, ErrorMessages } from '../constants'

export interface QueryContext {
  req: IAuthRequest
  res: Response
}

export interface ErrorType {
  message: ErrorMessages
  statusCode: ErrorCodes
}
