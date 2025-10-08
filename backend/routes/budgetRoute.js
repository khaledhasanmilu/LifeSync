const express = require('express');
const { getBudgets, createBudget, updateBudget, deleteBudget } = require('../controller/budget/budgetController');

const router = express.Router();

router.get('/:userId', getBudgets);
router.post('/', createBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

module.exports = router;