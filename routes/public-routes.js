// routes/publicRoutes.js
const express = require("express");
const router = express.Router();
const Slot = require("../models/Slots");

// GET public slots by owner ID
router.get("/slots/:slug", async (req, res) => {
  try {
    const slots = await Slot.find({ owner: req.params.ownerId });
    res.json({ slots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
