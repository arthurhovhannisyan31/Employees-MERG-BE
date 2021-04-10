// model
import { ErrorType } from '../models/common'

export enum ErrorMessages {
  Unauthorized = 'Unauthorized',
}

export enum ErrorCodes {
  Unauthorized = 401,
}

export const errorTypeMap: Record<ErrorMessages, ErrorType> = {
  [ErrorMessages.Unauthorized]: {
    message: ErrorMessages.Unauthorized,
    statusCode: ErrorCodes.Unauthorized,
  },
}
