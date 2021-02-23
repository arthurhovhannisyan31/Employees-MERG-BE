// helpers
import { IAuthRequest } from '../../models/auth'
import { EErrorName, errorTypeMap } from '../constants/error'

export const dateToISOString = (date: string): string =>
  new Date(date).toISOString()

export const authCheck = (req: IAuthRequest) => {
  // if (!req.isAuth) {
  //   throw new Error(EErrorName.UNAUTHORIZED)
  // }
}

export const getErrorCode = (
  errorName: typeof EErrorName[keyof typeof EErrorName],
) => errorTypeMap[errorName]
