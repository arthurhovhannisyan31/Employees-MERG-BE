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
    token: String!
  }
`
export const input = `
  input UserInput {
    email: String!
    password: String!
  }
`

export const query = `
  login(email: String!, password: String!):AuthData!
  me: UserCredentials!
`

export const mutation = `
  createUser(userInput: UserInput!): User
`
