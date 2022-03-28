const Listing = require('../models/Listing');

const { transformListing } = require('./merge');
  
module.exports = {
    listings: async () => {
      try {
        const listings = await Listing.find();
        return listings.map(listing => {
          return transformListing(listing);
        });
      } catch (err) {
        throw err;
      }
    },
    createListing: async args => {
      const listing = new Listing({
        title: args.listingInput.title,
        description: args.listingInput.description,
        price: +args.listingInput.price,
        date: new Date(args.listingInput.date),
        creator: '5c0fbd06c816781c518e4f3e'
      });
      let createdListing;
      try {
        const result = await listing.save();
        createdListing = transformListing(result);
        const creator = await User.findById('5c0fbd06c816781c518e4f3e');
  
        if (!creator) {
          throw new Error('User not found.');
        }
        creator.createdListings.push(Listing);
        await creator.save();
  
        return createdListing;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };