// deps
// local
// helpers

export const type = `
  type Employee {
    _id: ID!
    birth_date: String!
    first_name: String!
    last_name: String!
    hire_date: String!
    gender: Gender!
  }
`

export const input = `
  input CreateEmployeeInput {
    birth_date: String!
    first_name: String!
    last_name: String!
    hire_date: String!
    gender: ID!
  }
  input GetEmployeeInput {
    id: ID!
  }
`

export const query = `
  employees: [Employee!]!
  employee(input: GetEmployeeInput!): Employee!
`

export const mutation = `
  createEmployee(input: CreateEmployeeInput!): Employee!
`
