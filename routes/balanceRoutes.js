const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/',authMiddleware, balanceController.getUserBalance);

module.exports = router;
