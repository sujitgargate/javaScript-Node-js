var events = require('events');
var eventEmitter = new events.EventEmitter();
var nodemailer = require('nodemailer');
var dotenv = require('dotenv');
dotenv.config();

/// Create event handler
var sendEmail = function (subject, user, text) {
  /**
   * sendEmail comes from nodemailer which helps sending emails
   */
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: subject,
        text: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent to ' +user.email+ '  using node by '+ process.env.EMAIL);
        }
      });
}

/// Assign the event handler to an event
eventEmitter.on('sendEmail', sendEmail);
module.exports = eventEmitter;