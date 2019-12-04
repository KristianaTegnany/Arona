require('dotenv').load();
const client = require("twilio")(process.env.accountSid, process.env.authToken);

export default function(number, text, success_cb, error_cb) {
  client.messages
    .create({
      body: text,
      from: process.env.twilioNumber,
      to: number
    })
    .then(message => success_cb())
    .catch(error => error_cb(error));
}
