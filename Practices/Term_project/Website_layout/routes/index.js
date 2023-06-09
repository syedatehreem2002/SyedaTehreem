const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');


// Render the booking form
router.get('/', (req, res) => {
  res.render('index');
});

// Handle form submission - Create operation
router.post('/', async (req, res) => { // Updated route from '/booking' to '/'
  const { name, email, phoneNo, numberOfPersons } = req.body;

  const newBooking = new Booking({
    name,
    email,
    phoneNo,
    numberOfPersons,
  });

  try {
    const savedBooking = await newBooking.save();
    res.redirect('/booking'); // Redirect to the bookings page
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving booking');
  }
});

// Render the bookings page with a list of submitted forms - Read operation
router.get('/booking', async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.render('index', { bookingData: bookings }); // Pass bookings as bookingData to the template
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching bookings');
  }
});

// Render the edit form for a specific booking - Read operation
router.get('/booking/:id/edit', async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId);
    res.render('edit', { booking: booking });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching booking');
  }
});

// Handle form submission for updating a booking - Update operation
// Handle form submission for updating a booking - Update operation
router.post('/:id/update', async (req, res) => {
  const bookingId = req.params.id;
  const { name, email, phoneNo, numberOfPersons } = req.body;
  try {
    await Booking.findByIdAndUpdate(bookingId, {
      name,
      email,
      phoneNo,
      numberOfPersons,
    });
    res.redirect('/booking');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating booking');
  }
});

/// Handle form submission for deleting a booking - Delete operation
router.post('/booking/:id/delete', async (req, res) => {
  const bookingId = req.params.id;
  try {
    await Booking.findByIdAndRemove(bookingId);
    res.redirect('/booking');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting booking');
  }
});

module.exports = router;
