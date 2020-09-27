// deps
// local
// helpers

export const type = `
  type Employment {
    _id: ID!
    employee: Employee!
    department: Department!
    start_date: String!
    end_date: String!
  }
`

export const input = `
  input CreateEmploymentInput {
    employee: ID!
    department: ID!
    start_date: String!
    end_date: String!
  }
`

export const query = `
  employments: [Employment!]!
`

export const mutation = `
  createEmployment(input: CreateEmploymentInput!): Employment!
`
