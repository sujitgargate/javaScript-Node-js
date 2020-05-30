const User = require('../models/user.model')
const bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var eventEmitter = require('../events/event')
var Token = require('../models/token.model')
const jwt = require('jsonwebtoken');
/**
 * New user registration
 * @param  {} req
 * @param  {} res
 */
exports.Signup = async function (req, res) {
    /// checks if user exist
    var userExist = await User.findOne({
        email: req.body.email
    })

    try {
        /// checks if user exist if not then encrypt the password and add the user into database
        if (!userExist) {
            let user = new User(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
            );

            await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10), null, async function (err, hash) {
                if (err) {
                    throw err
                }
                else {
                    user.password = hash
                }
                /**
                 * 
                 */
                /// user call to create new user
                let userRegisteredResponse = await User.create(user);
                /**
                 * Creating an object of token model and assigning the user id 
                 * which we get after creating record after user in DB  & creating 
                 * token by crypto method
                 */
                var token = await new Token({
                    _userId: userRegisteredResponse._id,
                    token: crypto.randomBytes(16).toString('hex')
                });
                /**
                 *  Creating record of  token in DB if sucessful event 
                 *  will be triggered to send emails
                 */
                await token.save(async function (err) {
                    if (err) {
                        return res.status(500).send({ msg: err.message });
                    }
                    else {
                        let subject = 'Account verification Token';
                        let text = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:3000' + '\/confirmation\/' + token.token + '\n';
                        eventEmitter.emit('sendEmail', subject, user, text)
                    }
                })
                res.send({ status: userRegisteredResponse.name + ' registered' })
            })
        }
        else {
            res.status(400).send({ msg: 'The email address you entered is already associated with another account.' })
        }
    } catch (error) {
        res.send(error);
    }
}

exports.confirmUser = async (req, res) => {
    var tokenData = await Token.findOne({ token: req.params.token })
    if(!tokenData){
        return res.send({
            message : 'Invalid token passed'
        })
    }
    var userData = await User.findOne({
        _id : tokenData._userId
    })
    if(!userData){
        return res.status(401).send({
            message : 'users doesnt exist , account might be deleted'
        })
    }
    if(userData.isVerified){
        return res.send({
            message : 'User already verified'
        })
    }
    userData.isVerified = true;
    userData.save()
    .then(verifiedSucess =>{
        return res.send({
            message : 'Account sucessfully verified'
        })
    })
    .catch(error =>{
        return res.send(error);
    })      
}

exports.logInUser=  async (req,res)=>{
    var userData =  await User.findOne({email:req.body.email})
    
    if(!userData){
        return res.send({
            message:'user not found , Please register'
        })
    }else{
        bcrypt.compare(req.body.password,userData.password, (error,result)=>{
            if(!resultData){
                return res.send({
                    message:'password didnt match , Try again'
                })
            }if(resultData){
                const responseData=jwt.sign({
                    email : userData.email,
                    userId : userData.name
                },
                process.env.JWT_KEY,
                {
                    expiresIn :'20m'
                },

                )
                return res.send({
                    responseData : responseData,
                    message :' Login sucessful'
                })
            }
        })

    }
     
}