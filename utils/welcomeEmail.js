
const nodemailer = require("nodemailer");
const User = require('../models/Users')
const Slot = require('../models/Slots')

const sendWelcomeEmail = async({name, email})=>{
    // const owner = await User.findById(user._id)
        
    // console.log(owner.email);
        
    
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
        from: '"Bookly" <hi@booklyio.com>',
        to: email,
        subject: "Welcome to Bookly ! 😃",
        html: `
           <h1>Welcome to bookly ${name}</h1>
       `,
    });

    console.log("✅ Booking email sent via Resend", info.messageId );
    // console.log("Message sent:", info.messageId);
    })();
    } catch (error) {
        console.error("❌ Failed to send email:", error);
    }

}

module.exports = sendWelcomeEmail