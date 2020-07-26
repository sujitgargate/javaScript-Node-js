/**
 * router file contains all addresses which browser will request
 */

/**
 * Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. 
 * It facilitates the rapid development of Node based Web applications.
 * 
 *  Following are some of the core features of Express framework −
 * 
 * 1) Allows to set up middlewares to respond to HTTP Requests.
 * 
 * 2) Defines a routing table which is used to perform different actions based on HTTP Method and URL.
 * 
 * 3) Allows to dynamically render HTML Pages based on passing arguments to templates.
 */

var express = require('express')
/**
 * express mainly contains router , get() ,post() etc which is used in getting and posting data
 */
const router = express.Router();
/**
 * router() contains use () which imports expressvalidator , post-get methods
 */
expressValidator = require('express-validator')

/**
 * userController gets all methods inside it
 */
var userController= require('../controller/user.controller')

router.use(expressValidator())

router.post('/user',userController.createUser)
router.get('/verify/:token',userController.confirmUser);

router.post('/login',userController.login);

router.post('/resetpassword',userController.passwordReset);

router.post('/updatePassword/:token',userController.updatePassword);

module.exports=router