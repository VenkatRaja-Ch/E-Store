const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
});

const ProductCart = mongoose.model('ProductCart', ProductCartSchema)


const orderSchema = new mongoose.Schema({
    product: [ProductCartSchema],
    transaction_id: {},
    amount: {type: Number},
    address: {type: String},
    updated: Date,
    user: {
        type: ObjectID,
        ref: "User"
    }
},
{timestamps: true}
);

const orderSchema = mongoose.model("Order", orderSchema);

model.exports = {Order, ProductCart};