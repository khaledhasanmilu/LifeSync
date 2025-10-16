const express = require('express');
const router = express.Router();

const {getTasks, createTask, addSubtask, markTaskComplete, deleteTask,updateTask,deleteSubtask,markSubtaskComplete} = require('../controller/task/taskController');

router.get('/:userId', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.post('/subtask', addSubtask);
router.delete('/subtask/:id', deleteSubtask);
router.put('/subtask/:id/complete', markSubtaskComplete);
router.put('/:id/complete', markTaskComplete);
router.delete('/:id', deleteTask);

module.exports = router;