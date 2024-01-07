const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/generate',authMiddleware, referralController.generateReferralLink);
router.post('/verify',authMiddleware, referralController.verifyAndUseReferralLink);
router.post('/expire',authMiddleware, referralController.expireReferralLink);

module.exports = router;
