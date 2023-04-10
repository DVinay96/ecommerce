const usersRouter = require('./users')
const productsRouter = require('./products')
const ordersRouter = require('./orders')
const cartRouter = require('./cart')

const configure = (app) => {
    app.use('/users', usersRouter)
    app.use('/products', productsRouter)
    app.use('/orders', ordersRouter)
    app.use('/cart', cartRouter)
};

module.exports = configure;