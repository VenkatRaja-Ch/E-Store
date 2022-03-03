const User = require('../models/user');
const {check, validationResult} = require('express-validator');

//bringing jsonwebtoken for token creation
const jwt = require('jsonwebtoken');

//bringing express-jwt to put token into the browser
const expressJwt = require('express-jwt');


//signup controller:
exports.signup = (req, res) => {

    //saving validation
    const errors = validationResult(req);

    //checking validation
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    //creating new user object
    const user = new User (req.body);

    //saving the user to the database:
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Not able to save user in the database."
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
}


//signin controller:
exports.signin = (req, res) => {

    //saving validation
    const errors = validationResult(req);

    //destructing and fetching the user: email and password
    const {email, password} = req.body;

    //if there's an error message from the validator:
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    //fetch the email from database
    User.findOne({email}, (err, user) => {
        
        //if error found
        if(err || !user){
            return res.status(400).json({
                error: "User do not exist in our database"
            })
        }

        //if user found, then authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: "Email or Password was invalid!"
            })
        }
        

        //create a token
        const token = jwt.sign({_id: user._id}, process.env.SECRET);

        //putting the token into the browser cookie
        res.cookie("token", token, {expire: new Date() + 9999});

        //response to the front-end
        const{_id, name, email, role} = user
        return res.json({token, user: {
            _id, name, email, role
        }})

    })
}

exports.signout = (req, res)=>{
    res.json({
        message: "User-Signout-using-controller-file"
    });
};


//protected routes
exports.isSignedIn = expressJwt(

    //parameter 1: pass on an object
    {
        secret: process.env.SECRET,
        userProperty: "auth"
    }
);

    //custom middlewares

//for isAuthenticated
exports.isAuthenticated = (req, res, next) => {

    //checking whether the user is authenticated and can make changes to his profile.
    let checker = req.profile && req.auth && req.profile._id === req.auth._id;

    //if the user is not authenticated
    if(!checker){
        return res.status(403).json({
            error: "Access Denied, user is not authenticated!"
        })
    }

    //goto next middleware
    next();
};

// for isAdmin
exports.isAdmin = (req, res, next) => {

     
    //go to next middleware
    next();
}