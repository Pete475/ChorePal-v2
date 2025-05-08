const express = require('express');
const router = express.Router();
const { User, Child } = require('../model');
const authMiddleware = require('../middleware/auth');

// ---------- Add a child (only for parent users) ----------
router.post('/add', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const userType = req.user.type;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Child name is required' });
  }

  if (userType !== 'parent') {
    return res
      .status(403)
      .json({ error: 'Only parent users can add children' });
  }

  try {
    const newChild = new Child({
      name,
      parentId: userId,
    });

    await newChild.save();

    res
      .status(201)
      .json({ message: 'Child added successfully', child: newChild });
  } catch (err) {
    console.error('Error adding child:', err);
    res.status(500).json({ error: 'Failed to add child' });
  }
});

// ---------- Get all children of current parent ----------
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const userType = req.user.type;

  if (userType !== 'parent') {
    return res
      .status(403)
      .json({ error: 'Only parent users can view children' });
  }

  try {
    const children = await Child.find({ parentId: userId });
    res.json({ children });
  } catch (err) {
    console.error('Error fetching children:', err);
    res.status(500).json({ error: 'Failed to fetch children' });
  }
});

module.exports = router;
