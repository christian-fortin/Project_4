const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
// api/users

router.post('/login', loginUser)
// api/users

router.get('/me',protect, getMe)
// api/users

module.exports = router