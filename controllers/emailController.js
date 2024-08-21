const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ritujane78@gmail.com",
      pass: "yyfv xwyg sqrn joiy",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  
  const sendMail =async (req,res) => {
    const {recipientEmail, subject, htmlMessage } = req.body;

    console.log(recipientEmail);
    
    const mailOptions = {
      from: {
        name: "Auction Nest",
        address: "ritujane78@gmail.com"
      },
      to: recipientEmail, 
      subject: subject, 
      // text: textMessage, 
      html: htmlMessage, 
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email has been sent to " + recipientEmail);
      res.status(200).json({ message: 'Emails sent.' });
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  }

  module.exports = {sendMail};