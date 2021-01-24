// deps
// local
// helpers

export const type = `
  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
  }
  type UserCredentials{
    id: String!
    email: String!
  }
  type AuthData {
    userCredentials: UserCredentials
    token: String!
    tokenExpiration: Int!
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
  
`

export const mutation = `
  createUser(userInput: UserInput!): User
`
