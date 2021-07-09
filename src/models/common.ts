// deps
import { Response } from 'express'
// model
import { IAuthRequest } from './auth'

export interface QueryContext {
  req: IAuthRequest
  res: Response
}

export interface ErrorProps {
  message: string
  statusCode: number
}
export interface FieldError {
  field: string
  message: string
}
