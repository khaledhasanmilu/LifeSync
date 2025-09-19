const express = require('express');
const userRoutes = require('./routes/userRouts')

const app = express();
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// User routes
app.use('/users', userRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
