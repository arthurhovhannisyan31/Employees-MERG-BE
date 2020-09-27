"use strict";
// deps
// local
// helpers
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutation = exports.query = exports.input = exports.type = void 0;
exports.type = `
  type EmployeeTitle {
    _id: ID!
    employee: Employee!
    title: Title!
    start_date: String!
    end_date: String!
  }
`;
exports.input = `
  input CreateEmployeeTitleInput {
    employee: ID!
    title: ID!
    start_date: String!
    end_date: String!
  }
`;
exports.query = `
  employeesTitles: [EmployeeTitle!]!
`;
exports.mutation = `
  createEmployeeTitle(input: CreateEmployeeTitleInput!): EmployeeTitle!
`;
//# sourceMappingURL=index.js.map