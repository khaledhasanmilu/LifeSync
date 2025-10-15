const express = require('express');
const { getLearnings, createLearning, updateLearning, deleteLearning } = require('../controller/learning/learningController');

const router = express.Router();

router.get('/:userId', getLearnings);
router.post('/', createLearning);
router.put('/:id', updateLearning);
router.delete('/:id', deleteLearning);

module.exports = router;
