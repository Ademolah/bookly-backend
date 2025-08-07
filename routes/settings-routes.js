const express = require("express");
const Settings = require("../models/Settings");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require('../models/Users')

const JWT_SECRET = process.env.JWT_SECRET;

const verifyUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

// GET /api/settings
// router.get("/", verifyUser, async (req, res) => {
//   try {
//     let settings = await Settings.findOne({ userId: req.user.id });
//     if (!settings) {
//       settings = await Settings.create({ userId: req.user.id });
//     }

//     res.json(settings);
//   } catch (err) {
//     res.status(500).json({ msg: "Failed to load settings" });
//   }
// });

// GET /api/settings
router.get("/", verifyUser, async (req, res) => {
  try {
    let settings = await Settings.findOne({ userId: req.user.id });
    if (!settings) {
      settings = await Settings.create({ userId: req.user.id });
    }

    // ✅ Fetch user's slug from User model
    const user = await User.findById(req.user.id).select("slug");

    res.json({
      ...settings.toObject(), // Convert Mongoose doc to plain object
      slug: user?.slug,       // Add slug explicitly
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to load settings" });
  }
});


// PUT /api/settings/update
router.put("/update", verifyUser, async (req, res) => {
  const { businessName, businessDescription, whatsappNumber, notifications } = req.body;

  try {
    const updated = await Settings.findOneAndUpdate(
      { userId: req.user.id },
      {
        businessName,
        businessDescription,
        whatsappNumber,
        notifications
      },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update settings" });
  }
});

module.exports = router;
