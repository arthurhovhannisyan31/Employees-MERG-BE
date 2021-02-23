export const type = `
  type Paycheck {
    _id: ID!
    employee: Employee!
    salary: Float!
    start_date: String!
    end_date: String!
  }
`

export const input = `
  input CreatePaycheckInput {
    employee: ID!
    salary: Float!
    start_date: String!
    end_date: String!
  }
`

export const query = `
  paychecks: [Paycheck!]!

`

export const mutation = `
  createPaycheck(input: CreatePaycheckInput!): Paycheck!  
`
