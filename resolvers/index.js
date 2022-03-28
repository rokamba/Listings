const authResolver = require('./auth');
const listingsResolver = require('./listings');
const bookingResolver = require('./booking');

const rootResolver = {
  ...authResolver,
  ...listingsResolver,
  ...bookingResolver
};

module.exports = rootResolver;