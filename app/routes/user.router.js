var express = require('express')
const router = express.Router();
expressValidator = require('express-validator')
var userController= require('../controller/user.controller')
router.use(expressValidator())
router.post('/',userController.createUser)
router.get('/verify/:token',userController.confirmUser);
router.post('/login',userController.logInUser);

module.exports=router