const { Router } = require('express')
const router = Router()
const { getOrder, createOrder, updateOrder, deleteOrder } = require('../controllers/orders')

router.get('/', getOrder)

router.post('/', createOrder)

router.put('/', updateOrder)

router.delete('/', deleteOrder)

module.exports = router