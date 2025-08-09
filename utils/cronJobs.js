// cronJobs.js
const cron = require("node-cron");
const Booking = require("../models/Booking");
const sendReminderEmail = require("./reminderEmail");

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const twentyFiveMinutesLater = new Date(now.getTime() + 25 * 60000);

    // Find bookings starting within the next 25 minutes
    const upcomingBookings = await Booking.find({
      reminderSent: false
    }).populate("slotId");

    for (let booking of upcomingBookings) {
      const slotDateTime = new Date(`${booking.slotId.date}T${booking.slotId.time}`);
      
      if (slotDateTime > now && slotDateTime <= twentyFiveMinutesLater) {
        await sendReminderEmail(booking.email, booking.name, slotDateTime);
        
        booking.reminderSent = true;
        await booking.save();
      }
    }
  } catch (err) {
    console.error("Error checking reminders:", err);
  }
});
