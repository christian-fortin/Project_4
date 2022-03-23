const mongoose = require('./connection')
const Dots = require('../models/dots')
const dotsSeeds = require('./seeds.json')
// tells what data to bring in and which model to follow 

Dots.deleteMany({})
.then(()=>{
    return Dots.insertMany(dotsSeeds)
})
.then(data => console.log(data))
.catch(err=>console.log(err))
.finally(()=>{
    process.exit()
})
// Not exactly sure what this is^
