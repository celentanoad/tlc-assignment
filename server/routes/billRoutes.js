const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');

router.post('/parse', billController.parseBill);

module.exports = router;