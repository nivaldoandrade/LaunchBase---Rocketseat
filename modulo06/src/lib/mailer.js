const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3e12cbb0e31e1f",
      pass: "0a834c79909d10"
    }
  });

