import { Response } from 'express'

import { AuthRequest } from './auth'

export interface QueryContext {
  req: AuthRequest
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
