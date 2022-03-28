const Listing = require('../models/Listing');
const Booking = require('../models/Booking');
const {transformBooking, transformListing } = require('./merge');

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookListing: async args => {
    const fetchedListing = await Listing.findOne({ _id: args.listingId });
    const booking = new Booking({
      user: '5c0fbd06c816781c518e4f3e',
      listing: fetchedListing
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate('listing');
      const listing = transformListing(booking.listing);
      await Booking.deleteOne({ _id: args.bookingId });
      return listing;
    } catch (err) {
      throw err;
    }
  }
};