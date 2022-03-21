const express = require('express')
const router = express.Router()
// Bringing in express to this file where our routes will be
const {getDots, createDots, updateDots, deleteDots} = require('../controllers/dotController')


router.get('/', getDots)
// Our basic GET request

router.post('/', createDots)
// Our basic POST request

router.put('/:id', updateDots)
// Our basic PUT request

router.delete('/:id', deleteDots)
// Our basic DELETE request

module.exports = router
// Exporting the routes