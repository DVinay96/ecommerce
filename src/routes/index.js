const usersRouter = require('./users')
const productsRouter = require('./products')

const configure = (app) => {
    app.use('/users', usersRouter)
    app.use('./products', productsRouter)
};

module.exports = configure;