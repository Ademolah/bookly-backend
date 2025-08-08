require('dotenv').config()
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

app.use(cors({
  origin: [process.env.CLIENT_URL, "http://localhost:3000"],
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



