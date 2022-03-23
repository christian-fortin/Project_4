const express = require('express')
const router = express.Router()
// Bringing in express to this file where our routes will be
const {getDots, createDots, updateDots, deleteDots} = require('../controllers/dotController')
const {protect} = require('../middleware/authMiddleware')


router.get('/', protect, getDots)
// Our basic GET request

router.post('/', protect, createDots)
// Our basic POST request

router.put('/:id', protect, updateDots)
// Our basic PUT request

router.delete('/:id', protect, deleteDots)
// Our basic DELETE request

module.exports = router
// Exporting the routes