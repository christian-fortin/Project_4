const mongoose = require('./connection')
const Dots = require('../models/dots')
const dotsSeeds = require('./seeds.json')

Dots.deleteMany({})
.then(()=>{
    return Dots.insertMany(dotsSeeds)
})
.then(data => console.log(data))
.catch(err=>console.log(err))
.finally(()=>{
    process.exit()
})
