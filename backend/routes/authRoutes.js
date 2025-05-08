const express = require('express');
const router = express.Router();
const { User } = require('../model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ---------- Login ----------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user._id, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Return user info without password or __v
    const userToReturn = user.toObject();
    delete userToReturn.password;
    delete userToReturn.__v;

    res.json({ token, user: userToReturn });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------- Register ----------
router.post('/register', async (req, res) => {
  const { email, password, username, type } = req.body;

  if (!email || !password || !username || !type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create new user (password hash is done in pre-save hook)
    const newUser = new User({ email, password, username, type });
    await newUser.save();

    // Return user info (exclude password)
    const userToReturn = newUser.toObject();
    delete userToReturn.password;

    res.status(201).json(userToReturn);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
