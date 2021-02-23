export const type = `
  type EmployeeTitle {
    _id: ID!
    employee: Employee!
    title: Title!
    start_date: String!
    end_date: String!
  }
`

export const input = `
  input CreateEmployeeTitleInput {
    employee: ID!
    title: ID!
    start_date: String!
    end_date: String!
  }
`

export const query = `
  employeesTitles: [EmployeeTitle!]!
`

export const mutation = `
  createEmployeeTitle(input: CreateEmployeeTitleInput!): EmployeeTitle!
`
