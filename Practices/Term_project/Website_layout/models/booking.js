const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  numberOfPersons: {
    type: Number,
    required: true
  }
});

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;

