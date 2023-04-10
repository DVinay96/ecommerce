const { Router } = require('express')
const router = Router()
const { getCart, createCart, updateCart, deleteCart } = require('../controllers/cart')

router.get('/', getCart)

router.post('/', createCart)

router.put('/', updateCart)

router.delete('/', deleteCart)

module.exports = router