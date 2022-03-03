var express = require('express');
var router = express.Router();

//importing express validator
const { check, validationResult} = require('express-validator');

//importing methods from the controller:
const {signup, signout, signin, isSignedIn} = require("../controllers/auth");


//route for signup
router.post("/signup", [
    //using express validator
    //written down over here is old way to throw the error messages, read the docs to get the current usage way of throwing error messages.

    //old way below:
    check("name", "name should be of minimum three characters.").isLength({min:3}),

    //new way of throwing error messages:
    check("email").isEmail().withMessage("Email is required!"),
    check("password").isLength({min:5}).withMessage("please provide the password with atleast 5 character!")
], signup);

//route for signin
router.post(
    //route
    "/signin", 

    //using validators to verify the incoming data
    [
        check("email").isEmail(),
        check("password").isLength({ min : 5 }).withMessage("password field is required!")
    ],

    //controller which will handle this route
    signin
)


router.get("/signout", signout);

module.exports = router