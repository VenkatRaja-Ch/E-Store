//1. import mongoose
const mongoose = require ('mongoose');


//2. create the schema:
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 32,
        required: true,
        unique: true
    }
}, 
{timestamps: true}
); 

module.export = mongoose.export("Category ", categorySchema);