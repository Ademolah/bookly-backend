// const axios = require("axios");

// const sendWhatsApp = async ({ to, name, date, time }) => {
//   try {
//     const message = `📅 Hello ${name}, your booking on Bookly is confirmed for ${date} at ${time}.`;

//     await axios.post(
//       `https://graph.facebook.com/v18.0/${process.env.WA_PHONE_NUMBER_ID}/messages`,
//       {
//         messaging_product: "whatsapp",
//         to: to, // in international format, e.g. "2347025869279"
//         type: "text",
//         text: { body: message },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("✅ WhatsApp message sent");
//   } catch (err) {
//     console.error("❌ Failed to send WhatsApp:", err.response?.data || err.message);
//   }
// };

// module.exports = sendWhatsApp;

// utils/sendWhatsApp.js
const axios = require("axios");

const sendWhatsApp = async ({ to, name, date, time }) => {
  try {
    const message = `📅 Hello ${name}, your booking on Bookly is confirmed for ${date} at ${time}. Thank you for choosing us!`;

    const payload = {
      messaging_product: "whatsapp",
      to: to, // Must be in international format, e.g. "2347025869279"
      type: "text",
      text: {
        body: message,
      },
    };

    const headers = {
      Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    };

    const url = `https://graph.facebook.com/v18.0/${process.env.WA_PHONE_NUMBER_ID}/messages`;

    const response = await axios.post(url, payload, { headers });

    console.log("✅ WhatsApp message sent:", response.data);
    return true;
  } catch (err) {
    console.error("❌ Failed to send WhatsApp:", err.response?.data || err.message);
    return false;
  }
};

module.exports = sendWhatsApp;

