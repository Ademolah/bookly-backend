const nodemailer = require('nodemailer')

try {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "resend",
        pass: "re_imy4utkw_JbXZzMiDBv3gquToxVPubNpF",
    },
});

    // Wrap in an async IIFE so we can use await.
    (async () => {
    const info = await transporter.sendMail({
        from: '"Bookly" <hi@hqbinary.com>',
        to: "adeakinyemi129@gmail.com",
        subject: "New Booking Received",
        text: "Hello world?", // plain‑text body
        html: `
            <h2>New Booking on Bookly</h2>
       `,
    });

    console.log("✅ Booking email sent via Resend", info.messageId );
    // console.log("Message sent:", info.messageId);
    })();
} catch (error) {
    console.error("❌ Failed to send email:", error);
}