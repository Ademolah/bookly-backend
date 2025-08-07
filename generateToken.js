// // generate-token.js
// const { google } = require("googleapis");

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   "https://developers.google.com/oauthplayground" // or your redirect URL
// );

// // Replace with your real account email
// const SCOPE = ["binarytechs0011@gmail.com"];

// const url = oauth2Client.generateAuthUrl({
//   access_type: "offline",
//   scope: SCOPE,
// });

// console.log("Authorize this app by visiting this url:", url);

// generateToken.js
require('dotenv').config()
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const {
  GMAIL_USER,
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // OR your actual redirect URI
);

oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

const sendBookingEmail = async ({ name, email, phone, slot }) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_USER,
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `Bookly <${GMAIL_USER}>`,
      to: GMAIL_USER, // This goes to YOU (the business owner)
      subject: "📅 New Appointment Booking",
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${slot.date}</p>
        <p><strong>Time:</strong> ${slot.time}</p>
        <hr />
        <p>This notification was sent by Bookly</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = sendBookingEmail;

