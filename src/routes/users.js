const { Router } = require('express')
const router = Router()
const { getUser, createUser, updateUser, deleteUser, login } = require('../controllers/users')
const auth = require('../middlewares/auth')


router.get('/', getUser)

router.post('/', auth, createUser)

router.post('/login', auth, login)

router.put('/', updateUser)

router.delete('/', deleteUser)

module.exports = router