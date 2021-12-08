export const type = `
  type Employee {
    _id: ID!
    birth_date: String!
    first_name: String!
    last_name: String!
    hire_date: String!
    gender: ID!
    department: ID!
    title: ID!
  }
  type EmployeeExtended{
    _id: ID!
    birth_date: String!
    first_name: String!
    last_name: String!
    hire_date: String!
    gender: ID!
    department: ID!
    title: ID!
    paychecks: [Paycheck]!
    titles: [EmployeeTitle]!
    employments: [Employment]!
  }
  type Employees {
    nodes: [Employee!]!
    count: Int! 
  }
`

export const input = `
  input CreateEmployeeInput {
    birth_date: String!
    first_name: String!
    last_name: String!
    hire_date: String!
    gender: ID!
    department: ID!
    title: ID!
  }
  input UpdateEmployeeInput {
    id: ID
    birth_date: String
    first_name: String
    last_name: String
    hire_date: String
    department: ID
    title: ID
  }
  input GetEmployeeInput {
    id: ID!
  }
  input GetEmployeesInput {
    limit: Int!
    offset: Int!
  }
`

export const query = `
  employees(input: GetEmployeesInput): Employees!
  employee(input: GetEmployeeInput!): EmployeeExtended!
`

export const mutation = `
  createEmployee(input: CreateEmployeeInput!): EmployeeExtended!
  updateEmployee(input: UpdateEmployeeInput!): EmployeeExtended!
`
