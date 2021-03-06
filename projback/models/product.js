const mongoose = require ('mongoose');

//destructuring
const {ObjectId} = mongoose.Schema;

//create a schema for the product
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        maxlength: 32,
        required: true
    },

    description: {
        type: String,
        trim: true,
        maxlength: 2000
    },

    price: {
        type: Number,
        maxlength: 32,
        required: true,
        trim: true
    },

    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },

    stock: {
        type: Number
    },

    sold: {
        type: Number,
        default: 0
    },

    photo: {
        data: Buffer,
        contentType: String 
    }
}, {timestamps: true}
); 

module.exports = mongoose.model("Product", productSchema);