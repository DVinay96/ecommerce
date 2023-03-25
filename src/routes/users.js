const { Router } = require('express')
const router = Router()
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/users')

router.get('/', getUser)

router.post('/', createUser)

router.put('/', updateUser)

router.delete('/', deleteUser)

module.exports = router