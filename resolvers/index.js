const authResolver = require('./auth');
const listingResolver = require('./listing');
const bookingResolver = require('./booking');

const rootResolver = {
  ...authResolver,
  ...listingResolver,
  ...bookingResolver
};

module.exports = rootResolver;