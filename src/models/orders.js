const mongoose = require('mongoose');

const schema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productSize: {
        type: String
    },
    productQuantity: {
        type: Number
    }
})

const Orders = mongoose.model('cart', schema)
module.exports = Orders