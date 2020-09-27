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
  type AuthData {
    userId: ID!
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
