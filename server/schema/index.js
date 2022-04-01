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
  date: String!
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
  date: String!
}

input UserInput {
  email: String!
  password: String!
}

type RootQuery {
    listing: [Listing!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
<<<<<<< HEAD:server/schema/index.js
=======
    
>>>>>>> f2609035a0079519b16a8cfbb852223458b9d2ed:schema/index.js
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