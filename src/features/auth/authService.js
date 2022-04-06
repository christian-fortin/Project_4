// This file does the requests via axios for the USERS
// ====================================================================================================================

import axios from 'axios'
// Brings in axios which is used for requests. 

// const API_URL_USERS = `${process.env.REACT_APP_API_URL}/api/users/`
// // Used for setting the first half of the URL
const API_URL_USERS = process.env.REACT_APP_API_URL === "production"
? `${process.env.REACT_APP_API_URL}/api/users/` : 'mongodb://localhost:27017/dots';
// Used for setting the first half of the URL

// REACT_APP_API_URL

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL_USERS, userData)
  // sets what the response data is

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    // sets item in local storage
  }
  return response.data
  // returns the data created
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL_USERS + 'login/', userData)
  // Sends the data to set it. Posts that the user is logged in.
  console.log(response.data);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}
// Removes the user from local storage (logged in)

const authService = {
  register,
  // Registers a user on the front end
  logout,
  // Logout a user on the front end
  login,
  // Login a user on the front end
}

export default authService
// Exports all of these above functions