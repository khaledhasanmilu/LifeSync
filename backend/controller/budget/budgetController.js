const db = require('../../db/config');

// Get all budget entries for a user
// const getBudgets = (req, res) => {
//   const userId = req.params.userId;
//     db.query('SELECT * FROM budget WHERE user_id = ?', [userId], (err, results) => {
//         if (err) {
//             console.error('Error fetching budgets:', err);
//             return res.status(500).json({ error: 'Database error' });
//         }
//         // Format results to match expected output
//         const formattedResults = results.map(row => ({
//             id: row.id,
//             category: row.area,
//             limit: row.amount,
//             spent: row.spent !== undefined ? row.spent : 500 // default to 0 if not present
//         }));
//         res.json(formattedResults);
//     });
// };
const getBudgets = (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT 
    b.id,
    b.area AS category,
    b.amount AS 'limit',
    (
        SELECT IFNULL(SUM(f.amount), 0)
        FROM finance f
        WHERE f.user_id = b.user_id
          AND f.category = b.area
          AND f.type = 'expense'
    )AS spent
FROM budget b
WHERE b.user_id = ?;
`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching budgets:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    const formattedResults = results.map(row => ({
      id: row.id,
      category: row.category,
      limit: parseFloat(row.limit),
      spent: parseFloat(row.spent)
    }));

    res.json(formattedResults);
  });
};


// Create a new budget entry
const createBudget = (req, res) => {
  const { user_id, amount, area, date } = req.body;
    if (!user_id || !amount || !area) {
        return res.status(400).json({ error: 'User ID, amount, and area are required' });
    }
    db.query(
        'INSERT INTO budget (user_id, amount, area) VALUES (?, ?, ?)',
        [user_id, amount, area],
        (err, result) => {
            if (err) {
                console.error('Error creating budget:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'Budget created successfully', budgetId: result.insertId });
        }
    );
};

// Update a budget entry
const updateBudget = (req, res) => {
    const budgetId = req.params.id;             // Extract budgetId from URL parameters
    const { amount, area } = req.body;
    db.query(
        'UPDATE budget SET amount = ?, area = ? WHERE id = ?',
        [amount, area, budgetId],
        (err) => {
            if (err) {
                console.error('Error updating budget:', err);
                return res.status(500).json({ error: 'Database error' });
            }
        res.json({ message: 'Budget updated successfully' });
        }
    );
};

// Delete a budget entry
const deleteBudget = (req, res) => {
  const budgetId = req.params.id;             // Extract budgetId from URL parameters
    db.query('DELETE FROM budget WHERE id = ?', [budgetId], (err) => {
        if (err) {
            console.error('Error deleting budget:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Budget deleted successfully' });
    });
};
module.exports = { getBudgets, createBudget, updateBudget, deleteBudget };