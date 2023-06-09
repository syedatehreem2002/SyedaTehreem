const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
//API FUNCTIONS
// GET request to fetch all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// GET request to fetch a specific booking by ID
router.get('/bookings/:id', async (req, res) => {
    const bookingId = req.params.id;
    try {
      const booking = await Booking.findById(bookingId);
      if (booking) {
        res.json(booking);
      } else {
        res.status(404).json({ error: 'Booking not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching booking' });
    }
  });
  

// POST request to create a new booking
router.post('/bookings', async (req, res) => {
  const { name, email, phoneNo, numberOfPersons } = req.body;

  const newBooking = new Booking({
    name,
    email,
    phoneNo,
    numberOfPersons,
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving booking' });
  }
});

// PUT request to update an existing booking
router.put('/bookings/:id', async (req, res) => {
  const bookingId = req.params.id;
  const { name, email, phoneNo, numberOfPersons } = req.body;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        name,
        email,
        phoneNo,
        numberOfPersons,
      },
      { new: true }
    );
    if (updatedBooking) {
      res.json(updatedBooking);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating booking' });
  }
});

// DELETE request to delete a booking
router.delete('/bookings/:id', async (req, res) => {
  const bookingId = req.params.id;
  try {
    const deletedBooking = await Booking.findByIdAndRemove(bookingId);
    if (deletedBooking) {
      res.json(deletedBooking);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting booking' });
  }
});

module.exports = router;
