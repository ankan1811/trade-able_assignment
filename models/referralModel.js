const mongoose = require('mongoose');

const referralLinkSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  usageCount: { type: Number, default: 0 },
  maxUsage: { type: Number, default: 5 },
  expired: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const ReferralLink = mongoose.model('ReferralLink', referralLinkSchema);

module.exports = ReferralLink;
