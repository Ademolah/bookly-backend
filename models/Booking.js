// server/models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
    name: { type: String, required: true }, // person booking
    email: { type: String, required: true },
    phone: { type: String, required: true },
    reminderSent: {
      type: Boolean,
      default: false
    }

  },
  { timestamps: true }
);

bookingSchema.index({ userId: 1, slotId: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);
