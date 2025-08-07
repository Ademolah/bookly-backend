// server/routes/slotRoutes.js
const express = require("express");
const Slot = require("../models/Slots");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify token
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

// routes/publicRoutes.js
router.get("/slots/:ownerId", async (req, res) => {
  try {
    const slots = await Slot.find({ owner: req.params.ownerId });
    res.json({ slots });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// GET all slots for user
router.get("/", verifyUser, async (req, res) => {
  try {
    const slots = await Slot.find({ userId: req.user.id }).sort({ date: 1, time: 1 });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch slots" });
  }
});

// POST new slot
router.post("/", verifyUser, async (req, res) => {
  const { date, time } = req.body;

  try {
    const exists = await Slot.findOne({ userId: req.user.id, date, time });
    if (exists) return res.status(400).json({ msg: "Slot already exists" });

    const newSlot = await Slot.create({ userId: req.user.id, date, time });
    res.status(201).json(newSlot);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create slot", err });
  }
});

// DELETE slot
router.delete("/:id", verifyUser, async (req, res) => {
  try {
    await Slot.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ msg: "Slot deleted" });
  } catch {
    res.status(500).json({ msg: "Failed to delete slot" });
  }
});

module.exports = router;
