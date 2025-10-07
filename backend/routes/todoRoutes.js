const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controller/todo/todoController');

const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;