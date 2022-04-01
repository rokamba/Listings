const Listing = require('../models/Listing');
const User = require('../models/User');
const { dateToString } = require('../utils/helpers/date');

const listings = async listingIds => {
  try {
    const listing = await Listing.find({ _id: { $in: listingIds } });
    return listings.map(listing => {
      return transformListing(listing);
    });
  } catch (err) {
    throw err;
  }
};

const singleListing = async listingId => {
  try {
    const listing = await Listing.findById(listingId);
    return transformListing(listing);
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdListings: listings.bind(this, user._doc.createdListings)
    };
  } catch (err) {
    throw err;
  }
};

const transformListing = listing => {
  return {
    ...listing._doc,
    _id: listing.id,
    date: dateToString(listing._doc.date),
    creator: user.bind(this, listing.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    listing: singleListing.bind(this, booking._doc.listing),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

exports.transformListing = transformListing;
exports.transformBooking = transformBooking;