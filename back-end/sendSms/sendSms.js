const twilio = require("twilio");

// const accountSid = process.env.TWILIO_SID; // Your Twilio Account SID from environment variables
// const authToken = process.env.TWILIO_AUTH_TOKEN; // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

const sendSMS = async (message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: "+19705148197", // Replace with your Twilio number
      to: "+918610623230",
    });
    console.log("SMS sent successfully:", response.sid);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

// ✅ Export the function
module.exports = sendSMS;
