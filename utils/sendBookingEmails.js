
const nodemailer = require("nodemailer");
const User = require('../models/Users')
const Slot = require('../models/Slots')

const sendBookingEmail = async({name, email, phone, slot })=>{
    const owner = await User.findById(slot.userId)
        
    console.log(owner.email);
        
    
    try {

        // Create a test account or replace with real credentials.
        const transporter = nodemailer.createTransport({
        host: "smtp.resend.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "resend",
            pass: process.env.RESEND_API_KEY,
        },
    });

    // Wrap in an async IIFE so we can use await.
    (async () => {
    const info = await transporter.sendMail({
        from: '"Bookly" <hi@hqbinary.com>',
        to: owner.email,
        subject: "New Booking Received",
        text: "Hello world?", // plain‑text body
        html: `
            <h2>New Booking on Bookly</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Date:</strong> ${slot.date}</p>
            <p><strong>Time:</strong> ${slot.time}</p>
       `,
    });

    console.log("✅ Booking email sent via Resend", info.messageId );
    // console.log("Message sent:", info.messageId);
    })();
    } catch (error) {
        console.error("❌ Failed to send email:", error);
    }

}

module.exports = sendBookingEmail