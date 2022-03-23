const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

// GEnerate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, `${process.env.TOKEN_SECRET}`, {expiresIn: '30d',})
}

// POST a User
// Route: POST /api/users
// Access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Authenitcate a User
// Route: POST /api/users/login
// Access: Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
          });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
      }
});

// Get user data
// Route: GET /api/users/me
// Access: Private
const getMe = asyncHandler(async (req, res) => {
  const {_id, name, email} = await User.findById(req.user.id)

  res.status(200).json({
      id: _id,
      name,
      email,
  })
});


module.exports = {
  registerUser,
  loginUser,
  getMe,
};
