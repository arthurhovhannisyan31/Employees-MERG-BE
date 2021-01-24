// helpers
import { IAuthRequest } from '../../models/auth'

export const dateToISOString = (date: string): string =>
  new Date(date).toISOString()

export const authCheck = (req: IAuthRequest) => {
  if (!req.isAuth) {
    console.log('here');
    // console.log('alarm is off, for now just this', new Error('Unauthenticated request'))
    throw new Error('Unauthenticated request')
  }
}
