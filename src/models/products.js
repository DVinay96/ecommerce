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
    }
})

const Product = mongoose.model('products', schema)
module.exports = Product