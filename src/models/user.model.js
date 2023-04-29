const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  interest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interest'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
