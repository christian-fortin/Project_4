const mongoose = require('../db/connection')

const dotsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    url: { type: String, required: true},
    rating: {type: String, required: true},
    tags: {type: String, required: true},
    },
    {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
      }
    )

const Dots = mongoose.model('Dots', dotsSchema)

module.exports = Dots