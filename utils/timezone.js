//to be added to user model

// timezone: {
//   type: String,
//   default: "Africa/Lagos" // fallback
// }

// cronJobs.js
const cron = require("node-cron");
const moment = require("moment-timezone");
const Booking = require("../models/Booking");
const sendReminderEmail = require("./reminderEmail");

cron.schedule("* * * * *", async () => {
  try {
    const nowUTC = moment.utc();

    const upcomingBookings = await Booking.find({
      reminderSent: false
    }).populate([
      { path: "slotId" },
      { path: "ownerId" } // make sure booking schema references owner
    ]);

    for (let booking of upcomingBookings) {
      const ownerTimezone = booking.ownerId?.timezone || "Africa/Lagos";

      // Convert slot date/time into the owner's timezone
      const slotDateTime = moment.tz(
        `${booking.slotId.date} ${booking.slotId.time}`,
        "YYYY-MM-DD HH:mm",
        ownerTimezone
      );

      const diffInMinutes = slotDateTime.diff(nowUTC, "minutes");

      if (diffInMinutes > 0 && diffInMinutes <= 25) {
        await sendReminderEmail(booking.email, booking.name, slotDateTime);

        booking.reminderSent = true;
        await booking.save();
        console.log(`✅ Reminder sent for ${booking.name} at ${slotDateTime.format()}`);
      }
    }
  } catch (err) {
    console.error("Error checking reminders:", err);
  }
});
