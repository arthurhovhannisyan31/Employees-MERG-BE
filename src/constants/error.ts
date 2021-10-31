import { ErrorProps } from '../models/common'

export enum ErrorType {
  BadRequest = 'BadRequest',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
}

export const errorResponses: Record<ErrorType, ErrorProps> = {
  [ErrorType.BadRequest]: {
    message: 'Bad Request',
    statusCode: 400,
  },
  [ErrorType.Unauthorized]: {
    message: 'Unauthorized',
    statusCode: 401,
  },
  [ErrorType.Forbidden]: {
    message: 'Forbidden',
    statusCode: 403,
  },
}
