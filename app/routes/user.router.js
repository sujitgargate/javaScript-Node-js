var express = require('express')
const router = express.Router();
expressValidator = require('express-validator')
var userController= require('../controller/user.controller')
router.use(expressValidator())
router.post('/',userController.createUser)
router.get('/verify/:token',userController.confirmUser);
router.post('/loginMYCode',userController.logInUser);

router.post('/login',userController.login);

router.post('/resetpassword',userController.passwordReset);

module.exports=router