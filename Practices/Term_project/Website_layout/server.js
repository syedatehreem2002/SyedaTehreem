const express = require('express');
const Booking = require('./models/booking');
const mongoose = require('mongoose');
const bookingRouter = require('./routes/booking');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ST_CAFE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(express.json());

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Import the Booking model

// Set up view engine
app.set('view engine', 'ejs');

// Set up static folder
app.use(express.static('public'));

// Mount the bookingRouter to the /api endpoint
app.use('/api', bookingRouter);

// Handle POST request to /booking
app.post('/booking', (req, res) => {
  const { name, email, phoneNo, numberOfPersons } = req.body;

  // Create a new booking instance
  const newBooking = new Booking({
    name: name,
    email: email,
    phoneNo: phoneNo,
    numberOfPersons: numberOfPersons
  });

  // Save the new booking to the database
  newBooking.save()
    .then(() => {
      Booking.find()
        .then((bookingList) => {
          if (bookingList) {
            console.log(bookingList);
            res.render('index', { bookingData: bookingList });
          }
        })
        .catch((error) => {
          console.log(err);
          res.status(400).send("Bad Request");
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// GET route to render the edit form for a booking
app.get('/booking/:id/edit', (req, res) => {
  const bookingId = req.params.id;

  Booking.findById(bookingId, (err, booking) => {
    if (err) {
      console.log(err);
      res.send('Error retrieving booking');
    } else {
      res.render('edit', { booking });
    }
  });
});

// POST route to update a booking
app.post("/booking/:id/edit", async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { name, email, phoneNo, numberOfPersons } = req.body;

    // Find the booking by ID and update the specific fields
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { name, email, phoneNo, numberOfPersons }, // Update the field names here
      { new: true }
    );

    if (updatedBooking) {
      res.redirect("/"); // Redirect back to the index page
    } else {
      res.redirect("/"); // Redirect back to the index page
    }
  } catch (err) {
    console.log(err);
    res.redirect("/"); // Redirect back to the index page
  }
});
// POST route to delete a booking
app.post('/booking/:id/delete', (req, res) => {
  const bookingId = req.params.id;

  Booking.findByIdAndRemove(bookingId)
    .then(() => {
      res.redirect('/'); // Redirect back to the index page
    })
    .catch((err) => {
      console.log(err);
      res.send('Error deleting booking');
    });
});

// GET route to render the index page with all bookings
app.get('/', (req, res) => {
  Booking.find()
    .then((bookingList) => {
      if (bookingList) {
        res.render('index', { bookingData: bookingList });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Bad Request");
    });
});
// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
