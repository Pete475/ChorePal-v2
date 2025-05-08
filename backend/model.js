const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

/*---------- USER ----------*/
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  type: {
    type: String,
    enum: ['parent', 'child'],
    required: true,
  },
});

// Hash the password on 'save'
userSchema.pre('save', async function (next) {
  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

/*---------- CHILD ----------*/
const childSchema = new Schema({
  name: { type: String, required: true },
  parentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userRef: { type: Schema.Types.ObjectId, ref: 'User' },
});

/*---------- CHORE ----------*/
const choreSchema = new Schema({
  template: {
    type: Schema.Types.ObjectId,
    ref: 'ChoreList',
    required: true,
  },
  by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: Schema.Types.ObjectId, ref: 'Child', required: true },
  day: {
    type: String,
    required: true,
    enum: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  },
  status: { type: Boolean, default: false },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

/*---------- CHORE LIST ----------*/
const choreListSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chores: [
    {
      title: { type: String, required: true },
      description: String,
    },
  ],
});

const User = mongoose.model('User', userSchema);
const Child = mongoose.model('Child', childSchema);
const Chore = mongoose.model('Chore', choreSchema);
const ChoreList = mongoose.model('ChoreList', choreListSchema);

module.exports = { User, Child, Chore, ChoreList };
