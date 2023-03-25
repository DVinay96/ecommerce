const { request, response } = require('express'); //?????????? preguntar

const express = require('express');
const { findByIdAndUpdate } = require('../models/users'); // no se esta llamando, lo dejo ahi?
const Product = require('../models/products')


const getProduct = async (request, response) => {
    try {
        const product = await Product.find({});
        response.json(product);
    } catch (error) {
        console.log(error);
        response.json({
            message: 'Error'
        })
    }
}

const createProduct = async (request, response) => {
    const { productName, productType, productPrice, productSize } = request.body;
    try {
        await Product.create({
            productName,
            productType,
            productPrice,
            productSize
        });
        response.json({
            message: 'Product created',
        });
    } catch (error) {
        response.json({
            message: error.message
        })
    }
}


// quiero que lo busque y actualice por ID, puedo usar findbyIDandUpdate()??
const updateProduct = async (request, response) => {
    const { productName, productType, productPrice, productSize } = request.body;
    try {
        const product = await User.findOneAndUpdate({ _id }, { productName, productType, productPrice, productSize }, { new: true })
        if (user === null) {
            return response.json({
                message: error.message,
            })
        }
        response.json({
            message: 'Product updated',
            product
        })
    } catch (error) {
        response.json({
            message: error.message,
        })
    }
}

const deleteProduct = async (request, response) => {
    const { _id } = request.body;
    try {
        const product = await User.findOneAndDelete({ _id })
        if (product === null) {
            return response.json({
                message: error.message,
            })
        }
        response.json({
            message: 'Product deleted',
            productID
        })
    } catch (error) {
        response.json({
            message: error.message
        })
    }

}

module.exports = { deleteProduct, createProduct, updateProduct, deleteProduct }