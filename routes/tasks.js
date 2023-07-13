const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
// const validation = require('../middleware/validate');
// const { requiresAuth } = require('express-openid-connect');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all tasks
router.get('/', tasksController.getAllTasks);

// GET a single Task
router.get('/:id', tasksController.getTaskById);

// POST a new Task
router.post(
  '/',
  // requiresAuth(),
  isAuthenticated,
  //   validation.saveTask,
  tasksController.createTask
);

// PUT update data in an existing Task
router.put(
  '/:id',
  // requiresAuth(),
  isAuthenticated,
  //   validation.saveTask,
  tasksController.updateTask
);

// DELETE a Task
router.delete(
  '/:id',
  // requiresAuth(),
  isAuthenticated,
  tasksController.deleteTask
);

module.exports = router;
