const express = require('express')
// Bringing in the framework express
const dotenv = require('dotenv').config()
// Creating enviroment variable area
const port = process.env.PORT || 8000
// Declaring a port
const {errorHandler} = require('./middleware/errorMiddleware')
// Error Handler


const app = express()
// Using express

app.use(express.json())
app.use(express.urlencoded({extended: false}))





app.use('/api/dots', require('./routes/dotRoutes'))
// allows us to shorten the url to just / for home page by making '/api/dots' implicit and requiring the data from the file
app.use('/api/users', require('./routes/userRoutes'))
// allows us to shorten the url to just / for home page by making '/api/dots' implicit and requiring the data from the file

app.use(errorHandler)
// Custom error handler

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})
// Initializing the port (localhost)