// server/models/Slot.js
const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true }, // "2025-08-07"
    time: { type: String, required: true }, // "14:00"
  },
  { timestamps: true }
);

slotSchema.index({ userId: 1, date: 1, time: 1 }, { unique: true }); // Prevent duplicates

module.exports = mongoose.model("Slot", slotSchema);
