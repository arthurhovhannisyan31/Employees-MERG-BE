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
`
export const input = `
  input UserInput {
    email: String!
    password: String!
  }
`

export const query = `
  login(email: String!, password: String!): LoginResponse!
  logout: Boolean
  me: MeResponse!
`

export const mutation = `
  createUser(userInput: UserInput!): CreateUserResponse!
`
