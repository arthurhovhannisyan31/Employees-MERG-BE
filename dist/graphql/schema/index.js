"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
// deps
const graphql_1 = require("graphql");
// local
const department_1 = require("./department");
const auth_1 = require("./auth");
const gender_1 = require("./gender");
const title_1 = require("./title");
const employment_1 = require("./employment");
const employee_1 = require("./employee");
const employeeTitle_1 = require("./employeeTitle");
const paycheck_1 = require("./paycheck");
const booking_1 = require("./booking");
const event_1 = require("./event");
// helpers
exports.schema = graphql_1.buildSchema(`
  ${department_1.type}
  ${department_1.input}
  ${auth_1.type}
  ${auth_1.input}
  ${gender_1.type}
  ${gender_1.input}
  ${title_1.type}
  ${title_1.input}
  ${employment_1.type}
  ${employment_1.input}
  ${employee_1.type}
  ${employee_1.input}
  ${employeeTitle_1.type}
  ${employeeTitle_1.input}
  ${paycheck_1.type}
  ${paycheck_1.input}
  ${booking_1.type}
  ${booking_1.input}
  ${event_1.type}
  ${event_1.input}
  type RootQuery {
    ${department_1.query}
    ${auth_1.query}
    ${gender_1.query}
    ${title_1.query}
    ${employment_1.query}
    ${employee_1.query}
    ${employeeTitle_1.query}
    ${paycheck_1.query}
    ${booking_1.query}
    ${event_1.mutation}
  }
  type RootMutation {
    ${department_1.mutation}
    ${auth_1.mutation}
    ${gender_1.mutation}
    ${title_1.mutation}
    ${employment_1.mutation}
    ${employee_1.mutation}
    ${employeeTitle_1.mutation}
    ${paycheck_1.mutation}
    ${booking_1.mutation}
    ${event_1.query}
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
//# sourceMappingURL=index.js.map