import { regExp } from '../constants/regExp'

export const isEmailValid = (email: string): boolean =>
  !!email.match(regExp.email)

export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 32

export const isPasswordValid = (password: string): boolean =>
  new RegExp(
    `(^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}[\\]:;<>,?~_+\\-=|\\\\/]).{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$)`
  ).test(password)
