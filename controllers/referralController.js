const User = require('../models/userModel');
const ReferralLink = require('../models/referralModel');
function generateUniqueCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const codeLength = 8; // Adjust the length of the code as needed

  let code = '';
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

async function generateReferralLink(req, res) {
  try {
    const { userId } = req.user; // Assuming userId is included in the authenticated request
    const existingReferralLink = await ReferralLink.findOne({ creator: userId });
    if (existingReferralLink) {
      return res.status(400).json({ message: 'Referral link already exists for this user' });
    }
    const newReferralLink = new ReferralLink({
      code: generateUniqueCode(), // Implement a function to generate a unique code
      creator: userId,
    });
    await newReferralLink.save();
    res.status(201).json({ referralLink: newReferralLink });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function verifyAndUseReferralLink(req, res) {
  try {
    const { code } = req.body;
    const referralLink = await ReferralLink.findOne({ code });
    if (!referralLink || referralLink.expired || referralLink.usageCount >= referralLink.maxUsage) {
      return res.status(400).json({ message: 'Invalid or expired referral link' });
    }
    const referrer = await User.findById(referralLink.creator);
    referrer.balance += 5000;
    await referrer.save();
    referralLink.usageCount++;
    await referralLink.save();
    res.status(200).json({ message: 'Referral link verified and used successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function expireReferralLink(req, res) {
  try {
    const { userId } = req.user;
    const referralLink = await ReferralLink.findOne({ creator: userId });
    
    if (!referralLink) {
      return res.status(404).json({ message: 'Referral link not found for this user' });
    }
    
    const today = new Date();
    const expirationDate = new Date(referralLink.createdAt);
    expirationDate.setDate(expirationDate.getDate() + 5); // Expire after 5 days
    
    if (referralLink.usageCount >= referralLink.maxUsage || today >= expirationDate) {
      referralLink.expired = true;
      await referralLink.save();
      return res.status(200).json({ message: 'Referral link expired successfully' });
    }
    
    res.status(400).json({ message: 'Referral link cannot be expired yet' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = { generateReferralLink, verifyAndUseReferralLink, expireReferralLink };
