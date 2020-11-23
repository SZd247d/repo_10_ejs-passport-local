const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
