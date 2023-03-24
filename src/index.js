require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const db = require('./config/db');
const configureRoutes = require('./routes');

(async () => {
    await db()
    const app = express()

    app.use(cors())
    app.use(bodyParser.json())

    configureRoutes(app);

    app.listen(+process.env.PORT, () => {
        console.log('Server is running');
    })
})()

