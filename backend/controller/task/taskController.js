const db = require('../../db/config');

// Get all tasks for a user
const getTasks = (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, tasks) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    if (!tasks.length) {
      return res.json({ tasks: [] });
    }
    const taskIds = tasks.map(task => task.id);
    db.query('SELECT * FROM subtask WHERE id IN (?)', [taskIds], (err, subtasks) => {
      if (err) {
        return res.status(500).json({ error: 'Database query failed' });
      }
      // Attach subtasks to their parent task
      const tasksWithSubtasks = tasks.map(task => ({
        ...task,
        subtasks: subtasks.filter(subtask => subtask.task_id === task.id)
      }));
      res.json({ tasks: tasksWithSubtasks });
    });
  });
};

// Create a new task
const createTask = (req, res) => {
    console.log("hit task create endpoint");
    const { user_id, title, description, due_date, priority, status, recurrence, notes } = req.body;
    console.log("Creating task with data:", recurrence);
    db.query(
        'INSERT INTO tasks (title, description, due_date, priority, status, recurrence, notes, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, due_date, priority, status, recurrence, notes, user_id],
        (err, results) => {
            if (err) {
                console.error("Database query failed:", err); 
                return res.status(500).json({ error: 'Database query failed' });
            }
            res.status(201).json({
                id: results.insertId,
                title,
                description,
                due_date,
                priority,
                status,
                recurrence,
                notes,
                user_id
            });
        }
    );
};

const updateTask = (req, res) => {
  const taskId = req.params.id;
  const { title, description, due_date, priority, status, recurrence, notes } = req.body;
  console.log("Updating task:", taskId, title, description, due_date, priority, status, recurrence, notes);
  db.query(
    'UPDATE tasks SET title = ?, description = ?, due_date = ?, priority = ?, status = ?, recurrence = ?, notes = ? WHERE id = ?',
    [title, description, due_date, priority, status, recurrence, notes, taskId],
    (err) => {
      if (err) {
        console.error("Database query failed:", err); 
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.json({ message: 'Task updated successfully' });
    }
  );
};

const addSubtask = (req, res) => {
  const { task_id, name } = req.body;
  console.log("Adding subtask:", task_id, name);

  db.query('INSERT INTO subtask (task_id, name) VALUES (?, ?)', [task_id, name], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' ,error: err});
    }
    res.status(201).json({ id: results.insertId, task_id, name: name });
  });
};

const deleteSubtask = (req, res) => {
  const subtaskId = req.params.id;
  db.query('DELETE FROM subtask WHERE id = ?', [subtaskId], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json({ message: 'Subtask deleted successfully' });
    console.log("Deleted subtask:", subtaskId);
  });
};

const markSubtaskComplete = (req, res) => {
  const subtaskId = req.params.id;
  const { status } = req.body;
  console.log("Marking subtask as complete:", subtaskId, status);
  db.query('UPDATE subtask SET status = ? WHERE id = ?', [status, subtaskId], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json({ message: 'Subtask marked as complete' });
  });
};

const markTaskComplete = (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;
  console.log("Marking task as complete:", taskId, status);
  db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, taskId], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json({ message: 'Task marked as complete' });
  });
};

const deleteTask = (req, res) => {
  const taskId = req.params.id;
  db.query('DELETE FROM tasks WHERE id = ?', [taskId], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
};

module.exports = {
  getTasks,
  createTask,
  addSubtask,
  markTaskComplete,
  deleteTask,
  updateTask,
  deleteSubtask,
  markSubtaskComplete
};
