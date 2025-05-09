const express = require('express');
const router = express.Router();
const { ChoreList, Chore } = require('../model');
const authMiddleware = require('../middleware/auth');

// ---------- Get all chores & chore lists for logged-in user ----------
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    // find chore lists
    const choreLists = await ChoreList.find({ owner: userId });

    // find chores
    const chores = await Chore.find({ by: userId })
      .populate('to', 'name')
      .populate('template', 'title')
      .sort({ day: 1 });

    res.json({
      choreLists,
      chores,
    });
  } catch (err) {
    console.error('Error fetching chores:', err);
    res.status(500).json({ error: 'Failed to fetch chores' });
  }
});

// ---------- Add a new assigned chore (1 chore list per user) ----------
router.post('/add', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { title, childId, day } = req.body;

  console.log('backened add chore', req.body); 

  if (!title || !childId || !day) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if user has a list
    const choreList = await ChoreList.findOne({ owner: userId });
    if (!choreList) {
      return res.status(404).json({ error: 'No chore list found for user' });
    }

    // Check if chore is in list
    const matched = choreList.chores.find((chore) => chore.title === title);
    if (!matched) {
      return res.status(404).json({ error: 'Chore not found in chore list' });
    }

    // Create chore
    const newChore = new Chore({
      template: choreList._id,
      by: userId,
      to: childId,
      day,
      status: false,
    });

    await newChore.save();

    res
      .status(201)
      .json({ message: 'Chore assigned successfully', chore: newChore });
  } catch (err) {
    console.error('Error assigning chore:', err);
    res.status(500).json({ error: 'Failed to assign chore' });
  }
});

// ---------- Get chore list of current user ----------
router.get('/list', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const choreList = await ChoreList.findOne({ owner: userId });

    if (!choreList) {
      return res.status(404).json({ error: 'Chore list not found' });
    }

    res.json({ choreList });
  } catch (err) {
    console.error('Error fetching chore list:', err);
    res.status(500).json({ error: 'Failed to fetch chore list' });
  }
});

module.exports = router;
