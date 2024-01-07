const User = require('../models/userModel');

async function getUserBalance(req, res) {
  try {
    const { userId } = req.user; // Assuming userId is included in the authenticated request
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getUserBalance };
