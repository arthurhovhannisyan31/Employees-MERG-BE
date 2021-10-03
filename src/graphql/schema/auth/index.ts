const types = `
  type User {
    _id: ID!
    email: String!
    password: String
  }
  type UserCredentials{
    _id: String!
    email: String!
  }
  type AuthData {
    userCredentials: UserCredentials!
  }
  type FieldError {
    field: String!
    message: String!
  }
  
  type ForgottenPassword {
    key: String!
    userId: String!
    expiration: String!
  }
`
const responses = `
  type AuthResponse {
    errors: [FieldError!]
    data: AuthData
  }
  type MeResponse {
    errors: [FieldError!]
    data: UserCredentials
  }
  type CreateUserResponse {
    errors: [FieldError!]
    data: User
  }
  type UpdatePasswordResponse {
    errors: String
    data: UserCredentials
  }
  type ForgottenPasswordResponse {
    errors: String
    data: Boolean
  }
  type ValidateResetPasswordLinkResponse {
    errors: String
    data: ForgottenPassword
  }
`
export const type = `
  ${types}
  ${responses}
`
export const input = `
  input LoginInput {
    email: String!
    password: String!
  }
  input UserInput {
    email: String!
    password: String!
  }
  input ForgottenPasswordInput {
    email: String!
  }
  input UpdatePasswordInput {
    key: String!
    password: String!
  }
  input ValidateResetPasswordLinkInput {
    key: String!
  }
`

export const query = `
  login(input: LoginInput!): AuthResponse!
  logout: Boolean!
  me: MeResponse!
  forgottenPassword(input: ForgottenPasswordInput!): ForgottenPasswordResponse!
  validateResetPasswordLink(input: ValidateResetPasswordLinkInput!): ValidateResetPasswordLinkResponse
`

export const mutation = `
  createUser(input: UserInput!): CreateUserResponse!
  updatePassword(input: UpdatePasswordInput!): UpdatePasswordResponse!
`
