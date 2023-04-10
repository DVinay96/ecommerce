const { request, response } = require('express');
const express = require('express');
const { findByIdAndUpdate } = require('../models/cart');
const Cart = require('../models/cart')


const getCart = async (request, response) => {
    try {
        const users = await Cart.find({});
        response.json(users);
    } catch (error) {
        console.log(error);
        response.json({
            message: 'Error'
        })
    }
}

const createCart = async (request, response) => {
    const { productName, productType, productPrice, productSize, productQuantity } = request.body;
    try {
        await Orders.create({
            productName,
            productType,
            productPrice,
            productSize,
            productQuantity
        });
        response.json({
            message: 'Added to Cart',
        });
    } catch (error) {
        response.json({
            message: error.message
        })
    }
}

const updateCart = async (request, response) => {
    const { productName, productType, productPrice, productSize, productQuantity } = request.body;
    try {
        const cart = await Cart.findOneAndUpdate({ _id }, { productName, productType, productPrice, productSize, productQuantity }, { new: true })
        if (cart === null) {
            return response.json({
                message: error.message,
            })
        }
        response.json({
            message: 'Cart updated',
            cart
        })
    } catch (error) {
        response.json({
            message: error.message,
        })
    }
}

const deleteCart = async (request, response) => {
    const { _id } = request.body;
    try {
        const cart = await Cart.findOneAndDelete({ _id })
        if (cart === null) {
            return response.json({
                message: error.message,
            })
        }
        response.json({
            message: 'Cart Item Deleted',
            cart
        })
    } catch (error) {
        response.json({
            message: error.message
        })
    }

}

module.exports = { getCart, createCart, updateCart, deleteCart }

