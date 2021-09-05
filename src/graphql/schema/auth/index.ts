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
  type ForgottenPassword {
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
  input ForgottenPasswordInput {
    email: String!
  }
  input UpdatePasswordInput {
    key: String!
    password: String!
  }
`

export const query = `
  login(input: LoginInput!): LoginResponse!
  logout: Boolean!
  me: MeResponse!
  forgottenPassword(input: ForgottenPasswordInput!): LoginResponse
  updatePassword(input: UpdatePasswordInput!): Boolean!
`

export const mutation = `
  createUser(input: UserInput!): CreateUserResponse!
`
