// deps
// local
// helpers

export const type = `
  type Department {
    _id: ID!
    name: String!
  }
`
export const input = `
  input CreateDepartmentInput {
    name: String!
  }
`

export const query = `
  departments: [Department!]!
`

export const mutation = `
  createDepartment(input: CreateDepartmentInput!):Department!
`
