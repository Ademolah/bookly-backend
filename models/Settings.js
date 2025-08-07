const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    businessName: { type: String, default: "" },
    businessDescription: { type: String, default: "" },
    whatsappNumber: { type: String, default: "" },
    notifications: {
      email: { type: Boolean, default: true },
      whatsapp: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
