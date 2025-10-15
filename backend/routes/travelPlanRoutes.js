const express = require('express');
const { getTravelPlans, createTravelPlan, updateTravelPlan, deleteTravelPlan } = require('../controller/travel/travelPlanController');

const router = express.Router();

router.get('/:userId', getTravelPlans);
router.post('/', createTravelPlan);
router.put('/:id', updateTravelPlan);
router.delete('/:id', deleteTravelPlan);

module.exports = router;
