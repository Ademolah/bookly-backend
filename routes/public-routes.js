// routes/publicRoutes.js
const express = require("express");
const router = express.Router();
const Slot = require("../models/Slots");

// GET public slots by owner ID
router.get("/slots/:slug", async (req, res) => {
  try {
    // const slots = await Slot.find({ ownerIdId: req.params.ownerId });
    // const slots = await Slot.find({ ownerId: req.params.ownerId, is_booked: false }).sort({ date: 1, time: 1 });
    // res.json({ slots });
    const { slug } = req.params;

    // 1️⃣ Find the owner (user) of this slug
    const owner = await User.findOne({ slug });
    if (!owner) {
      return res.status(404).json({ msg: "Owner not found" });
    }

    // 2️⃣ Get only their available slots
    const slots = await Slot.find({
      ownerId: req.params.ownerId,
      is_booked: false
    });

    res.json({ slots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
