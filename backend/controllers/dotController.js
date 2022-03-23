const asyncHandler = require('express-async-handler')
const Dots = require('../models/dots')
const User = require('../models/user')

// GET USER DOTS
// route: GET /api/dots
// Access: Private
const getDots = asyncHandler(async (req, res)=> {
    const dots = await Dots.find({user: req.user.id})
// Will find all of the dots in our mongoDB local database
    res.status(200).json(dots)
    // If the dot's are found, it will send back a 200 ok status
})

// CREATE A DOT
// route: POST /api/dots
// Access: Private
const createDots = asyncHandler(async (req, res)=> {
    if (!req.body.name && !req.body.description && !req.body.url && !req.body.rating && !req.body.tags) {
        res.status(400)
        throw new Error('Please add the required fields')
    }
    // Checks to see if all of the required fields are there, if not it will ask to fill in all of the fields

    const dot = await Dots.create({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        rating: req.body.rating,
        tags: req.body.tags,
        user: req.user.id
    })
    // This is what it will create when the fields are put in^

    res.status(200).json(dot)
    // If the dot is created, it will send back a 200 ok status along with the updated dot
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
    // If it can't find the dot then it will send an error message saying it isnt found

    const user = await User.findById(req.user.id)
    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the loged in user matches the dot user
    if (dot.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized to update')
    }
    const updatedDot= await Dots.findByIdAndUpdate(req.params.id, req.body, {new: true})
    // Finds the dot and updates it by ID
    res.status(200).json(updatedDot)
      // If the dot is updated, it will send back a 200 ok status along with the dot
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

    const user = await User.findById(req.user.id)
    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the loged in user matches the dot user
    if (dot.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized to delete')
    }
    // Checks if the dot is existing
    await dot.remove()
    // removes the dot if existed

    res.status(200).json({id: req.params.id})
     // If the dot is deleted, it will send back a 200 ok status along with 
})


module.exports = {
    getDots,
    createDots,
    updateDots,
    deleteDots
}
// Exports these route controllers