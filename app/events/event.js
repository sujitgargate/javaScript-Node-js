var events = require('events');
var eventEmitter = new events.EventEmitter();
var nodemailer = require('nodemailer');
var dotenv = require('dotenv');
dotenv.config();

/// Create event handler
var sendEmail = function (subject, user, text) {
    // return new Promise(async function(resolve, reject){
    //     try {
    //         var transporter = await nodemailer.createTransport({
    //             host: 'smtp.gmail.com',
    //             service: 'gmail',
    //             port: 465,
    //             secure: true,

    //            // secure: true,
    //             auth: {
    //                 user: process.env.EMAIL,
    //                 pass: process.env.PASSWORD,
    //                 type: 'OAuth2'
    //             }
    //         });console.log('email transporter 1');

    //         var mailOptions =  {
    //             from: process.env.EMAIL,
    //             to: user.email,
    //             subject: subject,
    //             text: text
    //         }
    //         await transporter.sendMail(mailOptions, async function (error, info) {
    //             if (error) {
    //                 console.log('email transporter 2');
    //                 return await resolve(error.message)
    //             }
    //             else {
    //                 console.log('email transporter 3');
    //                 return resolve('Verfication mail has been sent to ' + user.email + '.');
    //             }
    //         });

    //     } catch (error) {
    //         return reject(error)
    //     }
    // })
       
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