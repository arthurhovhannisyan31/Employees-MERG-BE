"use strict";
// deps
// local
// helpers
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutation = exports.query = exports.input = exports.type = void 0;
exports.type = `
  type Gender {
    _id: ID!
    name: String!
  }
`;
exports.input = `
  input createGenderInput {
    name: String!
  }
`;
exports.query = `
  genders: [Gender!]!
`;
exports.mutation = `
  createGender(input: createGenderInput!): Gender!
`;
//# sourceMappingURL=index.js.map