const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// // MongoDB connection

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/latestdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

  const homeRouter = require('./routes');
  app.use('/index', homeRouter);
  //app.use('/bookings', homeRouter);


//const booking = require('./models/booking');

// const bookingSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
  
//   message: { type: String, required: true },
//   phoneNo: { type: String, required: true },
//   numberOfPersons: { type: Number, required: true },
//   // Add any other relevant fields for the booking
// });

// let Booking = mongoose.model('Booking', bookingSchema);


// app.post('/bookings', (req, res)=> {
  
//   console.log("Trying to save booking!!");
//   Booking.create(req.body.booking, (error, savedBooking) => {
//     if (error) {
//       console.log("Error saving Booking")
//     } else {
//       console.log("Booking Saved!!" + savedBooking);
//       res.redirect('/index');
//     }
//   })
// })


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});