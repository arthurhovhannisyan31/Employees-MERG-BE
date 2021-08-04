export const type = `
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
  type LoginResponse {
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
  type ForgotPassword {
    key: String!
    userId: String!
    expiration: String!
  }
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
  input ForgotPasswordInput {
    email: String!
  }
`

export const query = `
  login(input: LoginInput!): LoginResponse!
  logout: Boolean
  me: MeResponse!
  forgotPassword(input: ForgotPasswordInput!): LoginResponse
`

export const mutation = `
  createUser(input: UserInput!): CreateUserResponse!
`
