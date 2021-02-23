export const type = `
  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`

export const input = `
`

export const query = `
  bookings: [Booking!]!
`

export const mutation = `
  bookEvent(eventId: ID!): Booking!
  cancelBooking(bookingId: ID!): Event!
`
