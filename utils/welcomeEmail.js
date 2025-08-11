
const nodemailer = require("nodemailer");
const User = require('../models/Users')
const Slot = require('../models/Slots')

const sendWelcomeEmail = async(name, email)=>{
    // const owner = await User.findById(user._id)
        
    // console.log(owner.email);
        
    
    const nodemailer = require('nodemailer')
    
    try {
        // Create a test account or replace with real credentials.
        const transporter = nodemailer.createTransport({
        host: "smtp.resend.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "resend",
            pass:  process.env.RESEND_API_KEY,
        },
    });
    
        // Wrap in an async IIFE so we can use await.
        (async () => {
        const info = await transporter.sendMail({
            from: '"Bookly" <hi@hqbinary.com>',
            to: email,
            subject: "Welcome to Bookly 😃 !",
           
            html: `
                <!doctype html>
            <html>
            <body style="font-family: Arial, sans-serif; background-color: #f5f8fb; margin: 0; padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                    <td style="background-color: #00477B; padding: 20px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold;">
                    Welcome to Bookly
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.5;">
                    <p>Hi ${name},</p>
                    <p>We’re excited to have you on board! 🎉</p>
                    <p>With Bookly, you can easily manage your bookings, save time, and give your customers a seamless experience.</p>
                    <p style="text-align: center; margin: 30px 0;">
                        <a href="www.booklyio.com" style="background-color: #50D6FE; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-weight: bold;">
                        Get Started
                        </a>
                    </p>
                    <p>If you have any questions, feel free to reply to this email or contact us at <a href="mailto:info@booklyio.com" style="color: #00477B;">info@booklyio.com</a>.</p>
                    <p>Cheers,<br>The Bookly Team</p>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #f0f4f8; padding: 15px; text-align: center; color: #888888; font-size: 12px;">
                    © 2025 Bookly Built by Binary
                    </td>
                </tr>
                </table>
            </body>
            </html>
           `,
        });
    
        console.log(`✅ Welcome email sent to ${email}`, info.messageId );
        // console.log("Message sent:", info.messageId);
        })();
    } catch (error) {
        console.error("❌ Failed to send email:", error);
    }

}

module.exports = sendWelcomeEmail