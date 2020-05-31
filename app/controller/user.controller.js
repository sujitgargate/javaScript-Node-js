var userService = require('../services/user.service')

exports.createUser = (req,res,next)=>{
        req.assert('name', 'Name cannot be blank').notEmpty();
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.sanitize('email').normalizeEmail({ remove_dots: false });
       
        // Check for validation errors    
        var errors = req.validationErrors();
        if (errors) { return res.status(400).send(errors); }
        else{
            userService.Signup(req,res)
       }  
}

exports.confirmUser =(req,res)=>{
    try{
        req.assert('name', 'Name cannot be blank').notEmpty();
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.sanitize('email').normalizeEmail({ remove_dots: false });
        
        var error = req.validationErrors();
        if(error){
            return status(400).send(error);
        }else{
            userService.confirmUser(req,res);
        }
    }catch(error){
        req.send(error)
    }
}


exports.logInUser=(req,res)=>{
    try{
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.sanitize('email').normalizeEmail({ remove_dots: false });

        var error = req.validationErrors();
        if(error){
            return status(400).send(error);
        }else{
            userService.logInUser(req,res);
        }
    }catch(error){
        res.send(error)        
    }
}

exports.login=(req,res)=>{
    try{
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.sanitize('email').normalizeEmail({ remove_dots: false });

        var error = req.validationErrors();
        if(error){
            return status(400).send(error);
        }else{
            userService.login(req,res);
        }
    }catch(error){
        res.send(error)        
    }
}



exports.passwordReset =(req,res)=>{
    try{
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.assert('Retypepassword', 'Password must be at least 4 characters long').len(4);
        req.sanitize('email').normalizeEmail({ remove_dots: false });
        
        var error = req.validationErrors();
        if(error){
            console.log('inside 0');
            return status(400).send(error);
        }else{
            console.log('inside 1');
            userService.passwordReset(req,res);
        }
    }catch(error){
        req.send(error)
    }
}