const express = require('express');
const router = express.Router();

const Booking = require('../models/booking');

// Create a new booking
// router.post('/bookings', async (req, res) => {
//   try {
//     const booking = new Booking({
//       name: req.body.name,
//       email: req.body.email,
//       phoneNo: req.body.phoneNo,
//       numberOfPersons: req.body.numberOfPersons,
//       message: req.body.message
//     });

//     const savedBooking = await booking.save();
//     res.json(savedBooking);
//   } catch (error) {
//     res.status(500).json({ error: 'Unable to create booking' });
//   }
// });

//module.exports = router;

// // Read all bookings
// router.get('/bookings', async (req, res) => {
//   try {
//     const bookings = await Booking.find();
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: 'Unable to retrieve bookings' });
//   }
// });

// // Read a specific booking
// router.get('/bookings/:id', async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }
//     res.json(booking);
//   } catch (error) {
//     res.status(500).json({ error: 'Unable to retrieve booking' });
//   }
// });

// // Update a booking
// router.put('/bookings/:id', async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!booking) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }
//     res.json(booking);
//   } catch (error) {
//     res.status(500).json({ error: 'Unable to update booking' });
//   }
// });

// // Delete a booking
// router.delete('/bookings/:id', async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndRemove(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }
//     res.json({ message: 'Booking deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Unable to delete booking' });
//   }
// });


router.get('/', (req, res) => {
  console.log("getting here...");
  res.render('bookings'); // Replace 'page-name' with the appropriate EJS template name (without the file extension)
});

module.exports = router;