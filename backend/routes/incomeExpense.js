const express = require('express');
const router = express.Router();
const { setIncomeExpense, getIncomeExpense } = require('../controller/IncomeExpense/incomeEcpenseController');

// Route to add a new income/expense entry
router.post('/', setIncomeExpense);

// Route to get income/expense summary for a user
router.get('/:userId', getIncomeExpense);

module.exports = router;