const db = require('../../db/config');

// Get all learning entries for a user
const getLearnings = (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM learning WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching learnings:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Create a new learning entry
const createLearning = (req, res) => {
  const { user_id, title, description } = req.body;
  if (!user_id || !title) {
    return res.status(400).json({ error: 'User ID and title are required' });
  }
  db.query(
    'INSERT INTO learning (user_id, title, description) VALUES (?, ?, ?)',
    [user_id, title, description],
    (err, result) => {
      if (err) {
        console.error('Error creating learning:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Learning created successfully', learningId: result.insertId });
    }
  );
};

// Update a learning entry
const updateLearning = (req, res) => {
  const learningId = req.params.id;
  const { title, description, progress, completed } = req.body;
  db.query(
    'UPDATE learning SET title = ?, description = ?, progress = ?, completed = ? WHERE id = ?',
    [title, description, progress, completed, learningId],
    (err) => {
      if (err) {
        console.error('Error updating learning:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Learning updated successfully' });
    }
  );
};

// Delete a learning entry
const deleteLearning = (req, res) => {
  const learningId = req.params.id;
  db.query('DELETE FROM learning WHERE id = ?', [learningId], (err) => {
    if (err) {
      console.error('Error deleting learning:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Learning deleted successfully' });
  });
};

module.exports = { getLearnings, createLearning, updateLearning, deleteLearning };
