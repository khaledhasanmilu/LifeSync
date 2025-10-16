const express = require('express');
const { 
    getTravelPlans, createTravelPlan,
    updateTravelPlan, deleteTravelPlan ,
    addExpense,deleteExpense, addItem,
    updateItemStatus, deleteItem
    } = require('../controller/travel/travelPlanController');

const router = express.Router();

router.get('/:userId', getTravelPlans);
router.post('/', createTravelPlan);
router.put('/:id', updateTravelPlan);
router.delete('/:id', deleteTravelPlan);
router.post('/:id/expense', addExpense);
router.delete('/:id/expense', deleteExpense);
router.post('/:id/item', addItem);
router.put('/item/:id', updateItemStatus);
router.delete('/item/:id', deleteItem);


module.exports = router;
