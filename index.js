require('dotenv').config()
require('./utils/cronJobs')
const express = require('express')
const cors = require('cors')
const connectDb = require('./db/db')
const authRoute = require('./routes/auth-routes')
const slotRoutes = require('./routes/slot-routes')
const bookingRoutes = require("./routes/booking-routes");
const settingsRoutes = require('./routes/settings-routes')
const publicRoute = require('./routes/public-routes')

const app = express()

connectDb()

const allowedOrigins = [
  "https://bookly-frontend-fawn.vercel.app",
  "https://www.booklyio.com",
  "https://booklyio.com", // ✅ no www version too
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true
}));


app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to Bookly API");
});

app.use('/api/auth', authRoute)
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/settings", settingsRoutes);
app.use('/api/public', publicRoute)

app.listen(5000, ()=>{
    console.log('Server listening on port 5000');
})



