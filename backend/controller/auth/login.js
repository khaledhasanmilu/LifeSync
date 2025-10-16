const db = require('../../db/config');
const bcrypt = require('bcrypt');

// Get all users
const getUsers = (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      // Remove password from each user object
      const users = results.map(({ password, ...user }) => user);
      res.json(users);
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

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Set cookies for user id and name
      res.cookie('userId', user.id, { httpOnly: true });
      res.cookie('userName', user.name, { httpOnly: true });
      res.cookie('userEmail', user.email, { httpOnly: true });

      // Don't send password in response
      const { password: userPassword, ...userWithoutPassword } = user;
      res.json({ 
        message: 'Login successful', 
        user: userWithoutPassword 
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('userId');
  res.clearCookie('userName');
  res.clearCookie('userEmail');
  res.json({ message: 'Logout successful' });
};

module.exports = { getUsers, signupUser, loginUser, logoutUser };
