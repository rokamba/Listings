const Listing = require('../models/Listing');
const Booking = require('../models/Booking');
const { transformBooking, transformListing } = require('./merge');

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const fetchedListing = await Listing.findOne({ _id: args.listingId });
    const booking = new Booking({
      user: req.userId,
      listing: fetchedListing
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
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