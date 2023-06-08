const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  
  message: { type: String, required: true },
  phoneNo: { type: String, required: true },
  numberOfPersons: { type: Number, required: true },
  // Add any other relevant fields for the booking
});



const booking = mongoose.model('Booking', bookingSchema);

const newBooking = new booking({
  name: 'Syeda Tehreem',
  email: 'xx@gmail.com',
  phoneNo: "xxx-xxxxxxxx",
  message: "helloo",
  numberOfPersons: 3
});

// Save the ticket to the database
newBooking.save()
  .then(savedBooking => {
    console.log('Booking saved successfully:', savedBooking);
    mongoose.disconnect(); // Disconnect from the database after saving
  })
  .catch(error => {
    console.error('Error saving booking:', error);
    mongoose.disconnect(); // Disconnect from the database if an error occurs
  });


  module.exports = booking;