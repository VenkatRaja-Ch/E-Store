const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require('uuid/v1');

//          FROM DOCS
//  import mongoose from 'mongoose';
//   const { Schema } = mongoose;

//   const blogSchema = new Schema({
//     title:  String, // String is shorthand for {type: String}
//     author: String,
//     body:   String,
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now },
//     hidden: Boolean,
//     meta: {
//       votes: Number,
//       favs:  Number
//     }
//   });


// 1.        creating a schema
// const userSchema = new mongoose.Schema({
//     //work
// });

//2.    defining the attributes and filtering them.
// name : { 
//     type : String,  (type of data)
//     required : true, (it is a necessary field)
//     maxlength: 35, (length of the field)
//     trim : true (will trim out the left out spaces)
// }

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        maxlength: 35,
        trim: true
    },

    lastname : {
        type: String,
        required: false,
        maxlength: 35,
        trim: true
    },

    email : {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    userinfo : {
        type: String,
        trim: true
    },

    encry_password : {
        type: String,
        required: true
    },

    salt : String,

    role : {
        type: Number,
        default: 0
    },

    purchases : {
        type: Array,
        default: [] //empty array. Not purchased anything.
    }
}, {timestamps: true});

//creating the virtuals
userSchema.virtual('password')
    .set(function(password) {
        this._password = password;  //for future reference
        this.salt = uuidv1();   //taking the encrypted value.
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;  //if someone wants to take back the value from the virtual field.
    }) 
 

userSchema.methods = {

    //set an authetication method.
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },
    
    //this method will take the plain password from the user and convert it into a secure encrypted password using salt.

    securePassword: function(plainpassword){
        if(!plainpassword){
            return "";
        }

        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
}


//exporting the schema:
module.exports = mongoose.model("User", userSchema); 