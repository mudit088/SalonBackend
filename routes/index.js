var express = require('express');
var router = express.Router();

const passport = require("passport");
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
  res.render('login', {footer: false});
});


// Middleware
app.use(bodyParser.json());

let availability = [];
let bookings = [];

// Set Availability API
app.post('/api/availability', (req, res) => {
  const { date, slots } = req.body;
  // Assuming validation of date and slots format
  availability.push({ date, slots });
  res.status(200).send('Availability set successfully.');
});
 
app.post('/api/bookings', (req, res) => {
  const { date, slot, customer_name, customer_phone } = req.body;
  // Assuming validation of request body format
  const slotAvailable = availability.some(avail => avail.date === date && avail.slots.some(s => s.start_time === slot.start_time && s.end_time === slot.end_time));
  if (!slotAvailable) {
    return res.status(404).send('Slot not available for booking.');
  }
  bookings.push({ date, slot, customer_name, customer_phone });
  res.status(200).send('Booking scheduled successfully.');
});

app.get('/api/available-slots/:date', (req, res) => {
  const { date } = req.params;
  // Assuming validation of date format
  const availableSlots = availability.find(avail => avail.date === date);
  if (!availableSlots) {
    return res.status(404).send('No availability set for the specified date.');
  }
  res.status(200).json(availableSlots);
});

app.get('/api/bookings', (req, res) => {
  // Retrieve all booked slots
  if (bookings.length === 0) {
    return res.status(404).send('No bookings found.');
  }
  res.status(200).json(bookings);
});

function isLoggedIn(req, res, next ){
  if(req.isAuthenticated()) return next();
res.redirect("/login");
}
module.exports = router;
