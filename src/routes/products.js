const { Router } = require('express')
const router = Router()
const { getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/products')

router.get('/', getProduct)

router.post('/', createProduct)

router.put('/', updateProduct)

router.delete('/', deleteProduct)

module.exports = router