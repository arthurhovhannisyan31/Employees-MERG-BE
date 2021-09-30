import { regExp } from '../constants/regExp'
import { UserResponse } from '../models/auth'

type GetUserResponseErrorsProps = [field: string, message: string][]

export const getUserResponseErrors = (
  errors: GetUserResponseErrorsProps
): UserResponse<never> => {
  return {
    errors: errors.map(([field, message]) => ({ field, message })),
  }
}

export const isEmailValid = (email: string): boolean => regExp.email.test(email)
