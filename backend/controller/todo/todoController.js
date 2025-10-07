const db = require('../../db/config');

// Get all todos for a user
const getTodos = (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM todo WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching todos:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Create a new todo
const createTodo = (req, res) => {
  const { user_id, title, description, due_date } = req.body;
  if (!user_id || !title) {
    return res.status(400).json({ error: 'User ID and title are required' });
  }
  db.query(
    'INSERT INTO todo (user_id, title, description, due_date) VALUES (?, ?, ?, ?)',
    [user_id, title, description, due_date],
    (err, result) => {
      if (err) {
        console.error('Error creating todo:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Todo created successfully', todoId: result.insertId });
    }
  );
};
// Update a todo
const updateTodo = (req, res) => {
  const todoId = req.params.id;             // Extract todoId from URL parameters
  const { title, description, due_date, completed } = req.body;
  db.query(
    'UPDATE todo SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?',
    [title, description, due_date, completed, todoId],
    (err) => {
      if (err) {
        console.error('Error updating todo:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Todo updated successfully' });
    }
  );
};

// Delete a todo
const deleteTodo = (req, res) => {
  const todoId = req.params.id;             // Extract todoId from URL parameters
  db.query('DELETE FROM todo WHERE id = ?', [todoId], (err) => {
    if (err) {
      console.error('Error deleting todo:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Todo deleted successfully' });
  });
};
module.exports = { getTodos, createTodo, updateTodo, deleteTodo };