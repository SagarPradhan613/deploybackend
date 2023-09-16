const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Dummy data to simulate tasks
let tasks = [];

// API to view tasks according to filters (complete, all, pending)
app.get('/api/tasks', (req, res) => {
  const filter = req.query.filter || 'all';

  if (filter === 'all') {
    res.json(tasks);
  } else {
    const filteredTasks = tasks.filter((task) => task.status === filter);
    res.json(filteredTasks);
  }
});

// API to add a new task
app.post('/api/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = Date.now(); // Assign a unique ID
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// API to update a task
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedStatus = req.body.status;

  const taskToUpdate = tasks.find((task) => task.id === taskId);

  if (!taskToUpdate) {
    res.status(404).json({ message: 'Task not found' });
  } else {
    taskToUpdate.status = updatedStatus;
    res.json(taskToUpdate);
  }
});

// API to delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ message: 'Task not found' });
  } else {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
