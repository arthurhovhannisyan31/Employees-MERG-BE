export const type = `
  type Gender {
    _id: ID!
    name: String!
  }
`

export const input = `
  input createGenderInput {
    name: String!
  }
`

export const query = `
  genders: [Gender!]!
`

export const mutation = `
  createGender(input: createGenderInput!): Gender!
`
