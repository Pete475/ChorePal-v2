const express = require('express');
const router = express.Router();
const { User, ChoreList } = require('../model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const DEFAULT_CHORES = [
  { title: 'Do Laundry', description: 'Wash and fold clothes' },
  {
    title: 'Take Out Trash',
    description: 'Empty trash bins and take garbage outside',
  },
  {
    title: 'Sweep the Floor',
    description: 'Sweep dust and dirt from the floor',
  },
  { title: 'Wash Dishes', description: 'Clean all used dishes and utensils' },
  {
    title: 'Clean Room',
    description: 'Tidy up personal items and vacuum if needed',
  },
  { title: 'Water Plants', description: 'Water all indoor and outdoor plants' },
  { title: 'Feed Pets', description: 'Give food and water to pets' },
];

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
      process.env.JWT_SECRET
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

    // Create a default ChoreList and add default chores
    const defaultChoreList = new ChoreList({
      owner: newUser._id,
      chores: DEFAULT_CHORES,
    });
    await defaultChoreList.save();

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
