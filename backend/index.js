const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRouts');
const todoRoutes = require('./routes/todoRoutes');
const budgetRoutes = require('./routes/budgetRoute');
const incomeExpenseRoutes = require('./routes/incomeExpense');

const learningRoutes = require('./routes/learningRoutes');
const travelPlanRoutes = require('./routes/travelPlanRoutes');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  httpOnly: false,
  credentials: true
}));
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('🚀 LifeSync Backend Server is running...');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/income-expense', incomeExpenseRoutes);
app.use('/api/learnings', learningRoutes);
app.use('/api/travel-plans', travelPlanRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
