export const type = `
  type Title {
    _id: ID!
    name: String!
  }
`

export const input = `
  input CreateTitleInput {
    name: String!
  }
`

export const query = `
  titles: [Title!]!
`

export const mutation = `
  createTitle(input: CreateTitleInput!): Title!
`
