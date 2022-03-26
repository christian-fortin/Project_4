import axios from 'axios'
const API_URL_DOTS= `${process.env.REACT_APP_API_URL}/api/dots/`
// const API_URL_USERS = `${process.env.REACT_APP_API_URL}/api/users`
const createDot = async (dotData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL_DOTS, dotData, config)

    return response.data
}

const dotService = {
    createDot
}

export default dotService