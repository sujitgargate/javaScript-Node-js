var crypto = require('crypto');
var nodemailer = require('nodemailer');
var User = require('../models/user.model')
var bcrypt = require('bcrypt-nodejs')
var Token = require('../models/token.model')
var eventEmitter = require('../events/event')
exports.signup= async (req,res,next)=>{
  var userExists=await User.findOne({
    email : req.body.email
  })
  if(userExists){
    res.send({
      message : 'user already exist'
    })
  }
  let user = new User({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password
  })
  
  await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10),null, async (error,hash)=>{
    if(error) throw error;
    else {
      user.password=hash;
    }

    let userResponse = await User.create(user)
    var token = await new token ({
      _userId:userResponse._id,
      token:crypto.randomBytes(16).toString('hex')
    })
    
    await token.save(async function (err){
        if(err){
          return res.status(500).send({
            message :err.message
          })
        }else{
          let subject = 'account verification token'
          let text = token.token
          eventEmitter.emit('sendEmail',subject ,user,text)
        }
    })
    res.send({
      status : userResponse.name + ' registered'
    })
  })
}