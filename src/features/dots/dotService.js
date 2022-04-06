// This file does the requests via axios for the DOTS
// ====================================================================================================================


import axios from 'axios'
// Brings in axios which is used for requests. 
// const API_URL_DOTS= `${process.env.REACT_APP_API_URL}/api/dots/`
// // Used for setting the first half of the URL
// const API_URL_USERS = `${process.env.REACT_APP_API_URL}/api/users`
const API_URL_USERS = process.env.REACT_APP_API_URL === "production"
? `${process.env.REACT_APP_API_URL}/api/users/` : 'mongodb://localhost:27017/dots';
// Used for setting the first half of the URL



const createDot = async (dotData, token) => {
    // The function on the front end for creating the dots.
    console.log( 'Log for dotData in create - dotService', dotData);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
        // Checks for authorization to post it
    }
    const response = await axios.post(API_URL_DOTS, dotData, config)
    // Waits to get and post all of the data from the backend
    console.log(response.data, 'response.data from createDot - dotService')
    return (response.data)
    // returns the created data on the front end. 
}


const getDots = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // Checks for authorization to get it
    const response = await axios.get(API_URL_DOTS, config)
    // gets the actual data
    return response.data
     // returns the actual data
}

const deleteDots = async (dotId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
     // Checks for authorization to get it
    const response = await axios.delete(API_URL_DOTS + dotId, config)
    // gets the actual data and deletes based on the ID at the end of the URL

    return response.data
    // returns that data (deletes)
}

const dotService = {
    createDot,
    getDots,
    deleteDots
}

export default dotService
// Exports all of these functions