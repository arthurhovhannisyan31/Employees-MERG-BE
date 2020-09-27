"use strict";
// deps
// local
// helpers
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutation = exports.query = exports.input = exports.type = void 0;
exports.type = `
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
`;
exports.input = `
  input UserInput {
    email: String!
    password: String!
  }
`;
exports.query = `
  login(email: String!, password: String!):AuthData!
  
`;
exports.mutation = `
  createUser(userInput: UserInput!): User
`;
//# sourceMappingURL=index.js.map