export const type = `
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }
`

export const input = `
  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }
`

export const query = `
  events: [Event!]!
`

export const mutation = `
  createEvent(eventInput: EventInput!): Event
`
