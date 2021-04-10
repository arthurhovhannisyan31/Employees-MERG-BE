// deps
import { Response } from 'express'
// model
import { IAuthRequest } from './auth'

export interface QueryOptions {
  req: IAuthRequest
  res: Response
}
