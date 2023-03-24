const { request, response } = require('express');
const express = require('express');
const { findByIdAndUpdate } = require('../models/users');
const User = require('../models/users')


const getUser = async (request, response) => {
    try {
        const users = await User.find({});
        response.json(users);
    } catch (error) {
        console.log(error);
        response.json({
            message: 'Error'
        })
    }
}

const createUser = async (request, response) => {
    const { userName, email, password } = request.body;
    try {
        await User.create({
            userName,
            email,
            password
        });
        response.json({
            message: 'User created',
        });
    } catch (error) {
        response.json({
            message: error.message
        })
    }
}

const updateUser = async (request, response) => {
    const { email, userName, password } = request.body;
    try {
        const user = await User.findOneAndUpdate({ email }, { userName, password }, { new: true })
        if (user === null) {
            return response.json({
                message: error.message,
            })
        }
        response.json({
            message: 'User updated',
            user
        })
    } catch (error) {
        response.json({
            message: error.message,
        })
    }
}

const deleteUser = async (request, response) => {
    const { userName } = request.body;
    try {
        const user = await User.findOneAndDelete({ userName })
        if (user === null) {
            return response.json({
                message: error.message,
            })
        }
        response.json({
            message: 'User Deleted',
            userName
        })
    } catch (error) {
        response.json({
            message: error.message
        })
    }

}

module.exports = { getUser, createUser, updateUser, deleteUser }

