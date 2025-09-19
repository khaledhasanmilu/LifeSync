const db = require('../../db/config');
const bcrypt = require('bcrypt');

// Get all users
const getUsers = (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
};

// Signup new user
const signupUser = async (req, res) => {
  const { name, email, password} = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields (name, email, password, dob) are required' });
  }

  try {
    // Check if email already exists
    db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      db.query(
        'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
          }
          res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        }
      );
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getUsers, signupUser };
