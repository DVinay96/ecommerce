const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = db;