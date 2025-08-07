// server/routes/bookingRoutes.js
const express = require("express");
const Booking = require("../models/Booking");
const Slot = require("../models/Slots");
const jwt = require("jsonwebtoken");
const sendBookingEmail = require("../utils/sendBookingEmails");
const sendWhatsApp = require('../utils/sendWhatsApp')

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Verify user middleware
const verifyUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token, auth denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Public booking route
router.post("/public", async (req, res) => {
  const { slotId, name, email, phone } = req.body;

  if (!slotId || !name || !email || !phone) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const slot = await Slot.findById(slotId);
    // if (!slot) return res.status(404).json({ msg: "Slot not available" });
    if (!slot || slot.is_booked) return res.status(404).json({ msg: "Slot not available" });

    await Slot.findByIdAndUpdate(slotId, { is_booked: true });

    const alreadyBooked = await Booking.findOne({ slotId, email });
    if (alreadyBooked)
      return res.status(400).json({ msg: "You’ve already booked this slot" });

    const booking = await Booking.create({
      userId: slot.userId,
      slotId,
      name,
      email,
      phone,
    });

    // Send email
    await sendBookingEmail({ name, email, phone, slot });
    
    // await sendWhatsApp({
    // to: phone,
    // name,
    // date: slot.date,
    // time: slot.time,
    // });


    res.status(201).json({ msg: "Booking confirmed", booking });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Booking failed" });
  }
});


// GET all bookings for logged-in user
router.get("/", verifyUser, async (req, res) => {
  try {
    // console.log("Decoded userId from token:", req.user.id);
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("slotId")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch bookings" });
  }
});

// POST create new booking
router.post("/", verifyUser, async (req, res) => {
  const { slotId, name, email, phone } = req.body;

  try {
    const exists = await Booking.findOne({ userId: req.user.id, slotId });
    if (exists) return res.status(400).json({ msg: "Slot already booked" });

    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ msg: "Slot not found" });

    const booking = await Booking.create({
      userId: req.user.id,
      slotId,
      name,
      email,
      phone
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ msg: "Booking failed", err });
  }
});

// DELETE a booking
router.delete("/:id", verifyUser, async (req, res) => {
  try {
    await Booking.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ msg: "Booking cancelled" });
  } catch {
    res.status(500).json({ msg: "Cancel failed" });
  }
});

module.exports = router;
