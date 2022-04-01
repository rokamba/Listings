const Listing = require('../models/Listing');
const User = require('../models/User');

const { transformListing } = require('./merge');
  
module.exports = {
    listing: async () => {
      try {
        const listings = await Listing.find();
        return listings.map(listing => {
          return transformListing(listing);
        });
      } catch (err) {
        throw err;
      }
    },
    createListing: async (args, req) => {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      const listing = new Listing({
        title: args.listingInput.title,
        description: args.listingInput.description,
        price: +args.listingInput.price,
        date: args.listingInput.date,
        creator: req.userId
      });
      let createdListing;
      try {
        const result = await listing.save();
        createdListing = transformListing(result);
        const creator = await User.findById(req.userId);
  
        if (!creator) {
          throw new Error('User not found.');
        }
        creator.createdListings.push(listing);
        await creator.save();
  
        return createdListing;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };