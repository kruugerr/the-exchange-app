const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchange.controller');

// router.post('/seed', exchangeController.seedMockData); // post mock data to test connection
router.get('/', exchangeController.getAllExchanges);
module.exports = router;