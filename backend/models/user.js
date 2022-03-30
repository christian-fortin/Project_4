const mongoose = require('../db/connection')

const userSchema = new mongoose.Schema({
    name: 
    {type: String,
    required: [true, 'Please add a name']
    },

    email: 
    {type: String,
    required: [true, 'Please add an email'],
    unique: true,
    },
    
    password:
    {type: String,
    required: true},
},
{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
