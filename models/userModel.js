const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  referralLink: { type: mongoose.Schema.Types.ObjectId, ref: 'ReferralLink' },
  balance: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
