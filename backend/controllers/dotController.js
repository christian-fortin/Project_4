const asyncHandler = require('express-async-handler')

// GET USER DOTS
// route: GET /api/dots
// Access: Private
const getDots = asynchandler( (req, res)=> {
    res.status(200).json({message: 'Get dots'})
})

// CREATE A DOT
// route: POST /api/dots
// Access: Private
const createDots = asynchandler(async (req, res)=> {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({message: 'Create Dots'})
})

// UPDATE DOTS
// route: PUT /api/dots/id
// Access: Private
const updateDots = asynchandler((req, res)=> {
    res.status(200).json({message: `Update Dots ${req.params.id}`})
})

// DELETE DOTS
// route: DELETE /api/dots/id
// Access: Private
const deleteDots = asynchandler((req, res)=> {
    res.status(200).json({message: `Delete Dots ${req.params.id}`})
})


module.exports = {
    getDots,
    createDots,
    updateDots,
    deleteDots
}