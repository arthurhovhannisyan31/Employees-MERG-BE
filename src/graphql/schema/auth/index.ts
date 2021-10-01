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
  type VoidResponse {
    errors: [FieldError!]
  }
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
    errors: [FieldError!]
    data: Boolean!
  }
  type ValidateResetPasswordLinkResponse {
    errors: [FieldError!]
    data: ForgottenPassword!
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
  forgottenPassword(input: ForgottenPasswordInput!): VoidResponse!
  updatePassword(input: UpdatePasswordInput!): UpdatePasswordResponse!
  validateResetPasswordLink(input: ValidateResetPasswordLinkInput!): ValidateResetPasswordLinkResponse
`

export const mutation = `
  createUser(input: UserInput!): CreateUserResponse!
`
