const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Booking {
    _id: ID!
    listing: Listing!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Listing {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  creator: User!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdListings: [Listing!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input ListingInput {
  title: String!
  description: String!
  price: Float!
}

input UserInput {
  email: String!
  password: String!
}

type RootQuery {
    listing: [Listing!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createListing(listingInput: ListingInput): Listing
    createUser(userInput: UserInput): User
    bookListing(listingId: ID!): Booking!
    cancelBooking(bookingId: ID!): Listing!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);