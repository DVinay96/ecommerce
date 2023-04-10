const { request, response } = require('express');
const express = require('express');
const { findByIdAndUpdate } = require('../models/orders');
const Orders = require('../models/orders')


const getOrder = async (request, response) => {
    try {
        const users = await Orders.find({});
        response.json(users);
    } catch (error) {
        console.log(error);
        response.json({
            message: 'Error'
        })
    }
}

const createOrder = async (request, response) => {
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
            message: 'Order created',
        });
    } catch (error) {
        response.json({
            message: error.message
        })
    }
}

const updateOrder = async (request, response) => {
    const { productName, productType, productPrice, productSize, productQuantity } = request.body;
    try {
        const user = await Orders.findOneAndUpdate({ _id }, { productName, productType, productPrice, productSize, productQuantity }, { new: true })
        if (user === null) {
            return response.json({
                message: error.message,
            })
        }
        response.json({
            message: 'Order updated',
            user
        })
    } catch (error) {
        response.json({
            message: error.message,
        })
    }
}

const deleteOrder = async (request, response) => {
    const { _id } = request.body;
    try {
        const user = await User.findOneAndDelete({ _id })
        if (user === null) {
            return response.json({
                message: error.message,
            })
        }
        response.json({
            message: 'Order Deleted',
            userName
        })
    } catch (error) {
        response.json({
            message: error.message
        })
    }

}

module.exports = { getOrder, createOrder, updateOrder, deleteOrder }

