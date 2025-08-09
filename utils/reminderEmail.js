
const nodemailer = require("nodemailer");


const sendReminderEmail = async(to, name, slotDateTime)=>{
    
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
        to,
        subject: "Bookly Appointment Reminder",
        html: `
            <p>Hi ${name},</p>
            <p>This is a friendly reminder that your appointment is scheduled for <strong>${slotDateTime.toLocaleString()}</strong>.</p>
            <p>Please be on time.</p>
            <br/>
            <p>The Bookly Team</p>
       `,
    });

    console.log(`✅ Reminder sent to ${to}`);
    
    })();
    } catch (error) {
        console.error("❌ Failed to send email:", error);
    }

}

module.exports = sendReminderEmail;














// utils/sendReminderEmail.js
// const { resend } = require("./resendClient");

// async function sendReminderEmail(to, name, slotDateTime) {
//   try {
//     await resend.emails.send({
//       from: "Bookly <noreply@booklyio.com>",
//       to,
//       subject: "Appointment Reminder - Bookly",
//       html: `
//         <p>Hi ${name},</p>
//         <p>This is a friendly reminder that your appointment is scheduled for <strong>${slotDateTime.toLocaleString()}</strong>.</p>
//         <p>Please be on time.</p>
//         <br/>
//         <p>— The Bookly Team</p>
//       `
//     });
//     console.log(`✅ Reminder sent to ${to}`);
//   } catch (error) {
//     console.error("❌ Error sending reminder:", error);
//   }
// }

// module.exports = sendReminderEmail;