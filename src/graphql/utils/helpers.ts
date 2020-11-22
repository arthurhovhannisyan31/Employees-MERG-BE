// deps
// local
// helpers
import { IAuthRequest } from '../../models/auth'

export const dateToISOString = (date: string): string =>
  new Date(date).toISOString()

export const authCheck = (req: IAuthRequest) => {
  if (!req.isAuth) {
    // throw new Error('Unauthenticated request')
  }
}
