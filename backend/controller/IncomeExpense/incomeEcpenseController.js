const db = require('../../db/config');

// Add a new income/expense entry
const setIncomeExpense = (req, res) => {
    const { user_id, type, amount, category } = req.body;
    if (!user_id || !amount || !category || !type) {
        return res.status(400).json({ error: 'User ID, amount, category, and type are required' });
    }
    db.query(
        'INSERT INTO finance (user_id, type, amount, category) VALUES (?, ?, ?, ?)',
        [user_id, type, amount, category],
        (err, result) => {
            if (err) {
                console.error('Error creating income/expense entry:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'Entry created successfully', entryId: result.insertId });
        }
    );
};

// Get income/expense summary for a user
const getIncomeExpense = (req, res) => {
    const userId = req.params.userId;
    db.query(
        `SELECT 
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
                (SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)) AS saving
            FROM finance
            WHERE user_id = ?`,
        [userId],
        (err, results) => {
            if (err) {
                console.error('Error fetching income/expense summary:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(results[0]);
        }
    );
};

module.exports = {
    setIncomeExpense,
    getIncomeExpense,
};