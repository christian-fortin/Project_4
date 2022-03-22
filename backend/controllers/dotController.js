const asyncHandler = require('express-async-handler')
const Dots = require('../models/dots')

// GET USER DOTS
// route: GET /api/dots
// Access: Private
const getDots = asyncHandler(async (req, res)=> {
    const dots = await Dots.find()


    res.status(200).json(dots)
})

// CREATE A DOT
// route: POST /api/dots
// Access: Private
const createDots = asyncHandler(async (req, res)=> {
    if (!req.body.name && !req.body.description && !req.body.url && !req.body.rating && !req.body.tags) {
        res.status(400)
        throw new Error('Please add the required fields')
    }

    const dot = await Dots.create({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        rating: req.body.rating,
        tags: req.body.tags
    })

    res.status(200).json(dot)
})

// UPDATE DOTS
// route: PUT /api/dots/id
// Access: Private
const updateDots = asyncHandler( async(req, res)=> {
    const dot = await Dots.findById(req.params.id)
    if(!dot) {
        res.status(400)
        throw new Error('Dot not found')
    }

    const updatedDot= await Dots.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedDot)
})

// DELETE DOTS
// route: DELETE /api/dots/id
// Access: Private
const deleteDots = asyncHandler( async(req, res)=> {
    const dot = await Dots.findById(req.params.id)
    if(!dot) {
        res.status(400)
        throw new Error('Dot not found')
    }
    await dot.remove()

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getDots,
    createDots,
    updateDots,
    deleteDots
}