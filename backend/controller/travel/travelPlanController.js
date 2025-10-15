const db = require('../../db/config');

// Get all travel plans for a user
const getTravelPlans = (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM travel_plans WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching travel plans:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Create a new travel plan
const createTravelPlan = (req, res) => {
  const { user_id, destination, start_date, end_date, budget, description } = req.body;
  if (!user_id || !destination || !start_date || !end_date) {
    return res.status(400).json({ error: 'User ID, destination, start date, and end date are required' });
  }
  db.query(
    'INSERT INTO travel_plans (user_id, destination, start_date, end_date, budget, description) VALUES (?, ?, ?, ?, ?, ?)',
    [user_id, destination, start_date, end_date, budget, description],
    (err, result) => {
      if (err) {
        console.error('Error creating travel plan:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Travel plan created successfully', travelPlanId: result.insertId });
    }
  );
};

// Update a travel plan
const updateTravelPlan = (req, res) => {
  const travelPlanId = req.params.id;
  const { destination, start_date, end_date, budget, description, status } = req.body;
  db.query(
    'UPDATE travel_plans SET destination = ?, start_date = ?, end_date = ?, budget = ?, description = ?, status = ? WHERE id = ?',
    [destination, start_date, end_date, budget, description, status, travelPlanId],
    (err) => {
      if (err) {
        console.error('Error updating travel plan:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Travel plan updated successfully' });
    }
  );
};

// Delete a travel plan
const deleteTravelPlan = (req, res) => {
  const travelPlanId = req.params.id;
  db.query('DELETE FROM travel_plans WHERE id = ?', [travelPlanId], (err) => {
    if (err) {
      console.error('Error deleting travel plan:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Travel plan deleted successfully' });
  });
};

module.exports = { getTravelPlans, createTravelPlan, updateTravelPlan, deleteTravelPlan };
