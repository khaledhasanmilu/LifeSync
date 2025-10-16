const db = require('../../db/config');

// Get all travel plans for a user
const getTravelPlans = (req, res) => {
  const userId = req.params.userId;
  db.query(
    `SELECT 
      tp.*, 
      te.id AS expense_id, te.name AS expense_name, te.amount AS expense_amount, te.create_at AS expense_date,
      ti.id AS item_id, ti.name AS item_name, ti.packed AS item_packed
    FROM travel_plans tp
    LEFT JOIN travel_expense te ON tp.id = te.travel_id
    LEFT JOIN travel_item ti ON tp.id = ti.travel_id
    WHERE tp.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) {
        console.error('Error fetching travel plans:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!results.length) return res.json([]);

      // Group by travel plan, avoid duplicate items/expenses
      const plansMap = {};
      results.forEach(row => {
        if (!plansMap[row.id]) {
          plansMap[row.id] = {
            id: row.id,
            user_id: row.user_id,
            destination: row.destination,
            start_date: row.start_date,
            end_date: row.end_date,
            budget: row.budget,
            description: row.description,
            status: row.status,
            expenses: [],
            packingList: [],
            _expenseIds: new Set(),
            _itemIds: new Set()
          };
        }
        // Add expense if exists and not already added
        if (row.expense_id && !plansMap[row.id]._expenseIds.has(row.expense_id)) {
          plansMap[row.id].expenses.push({
            id: row.expense_id,
            name: row.expense_name,
            amount: row.expense_amount,
            date: row.expense_date
          });
          plansMap[row.id]._expenseIds.add(row.expense_id);
        }
        // Add item if exists and not already added
        if (row.item_id && !plansMap[row.id]._itemIds.has(row.item_id)) {
          plansMap[row.id].packingList.push({
            id: row.item_id,
            name: row.item_name,
            packed: row.item_packed
          });
          plansMap[row.id]._itemIds.add(row.item_id);
        }
      });

      // Remove internal sets before sending response
      const plans = Object.values(plansMap).map(plan => {
        delete plan._expenseIds;
        delete plan._itemIds;
        return plan;
      });

      res.json(plans);
    }
  );
};

// Create a new travel plan
const createTravelPlan = (req, res) => {
  const { user_id, destination, start_date, end_date, budget, description } = req.body;
  console.log(req.body);
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
  console.log(req.body);
  const { destination, start_date, end_date, budget, description, status } = req.body;
  console.log(req.body);
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

const addExpense = (req, res) => {
  const travelPlanId = req.params.id;
  const { amount, name } = req.body;
  if (!amount || !name) {
    return res.status(400).json({ error: 'Amount and name are required' });
  }
  db.query(
    'INSERT INTO travel_expense (travel_id, amount, name) VALUES (?, ?, ?)',
    [travelPlanId, amount, name],
    (err, result) => {
      if (err) {
        console.error('Error adding expense:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Expense added successfully', expenseId: result.insertId });
    }
  );
};

const deleteExpense = (req, res) => {
  const expenseId = req.params.id;
  console.log(expenseId);
  
  if (!expenseId) {
    return res.status(400).json({ error: 'Expense ID is required' });
  }
  db.query('DELETE FROM travel_expense WHERE id = ?', [expenseId], (err) => {
    if (err) {
      console.error('Error deleting expense:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Expense deleted successfully' });
  });
};

const addItem = (req, res) => {
  const travelPlanId = req.params.id;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Item name is required' });
  }
  db.query(
    'INSERT INTO travel_item (travel_id, name, packed) VALUES (?, ?, ?)',
    [travelPlanId, name, 0],
    (err, result) => {
      if (err) {
        console.error('Error adding item:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Item added successfully', itemId: result.insertId });
    }
  );
}

const updateItemStatus = (req, res) => {
  const itemId = req.params.id;
  const { status } = req.body;
  
  db.query(
    'UPDATE travel_item SET packed = ? WHERE id = ?',
    [status, itemId],
    (err) => {
      if (err) {
        console.error('Error updating item status:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Item status updated successfully' });
    }
  );
};

const deleteItem = (req, res) => {
  const itemId = req.params.id;
  if (!itemId) {
    return res.status(400).json({ error: 'Item ID is required' });
  }
  db.query('DELETE FROM travel_item WHERE id = ?', [itemId], (err) => {
    if (err) {
      console.error('Error deleting item:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Item deleted successfully' });
  });
}

module.exports = { getTravelPlans, createTravelPlan, updateTravelPlan, deleteTravelPlan, addExpense ,deleteExpense, addItem ,updateItemStatus, deleteItem};
