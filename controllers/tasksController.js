const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const validation = require('../middleware/validate');

// get all tasks from database
const getAllTasks = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db('task-oh')
      .collection('tasks')
      .find();
    result.toArray().then((tasks) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(tasks);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single task from database
const getTaskById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid task id to find a task.');
    }
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('task-oh')
      .collection('tasks')
      .find({ _id: taskId });
    result.toArray().then((tasks) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(tasks[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create new task
const createTask = async (req, res) => {
  try {
    const task = {
      title: req.body.title,
      description: req.body.description,
      dueDate: new Date(req.body.dueDate),
      assignee: req.body.assignee,
      status: req.body.status,
      priority: req.body.priority,
      project: req.body.project
    };

    //validation
    const validationResponse = validation.taskValidation(task);

    if(validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse
      });
    }

    const response = await mongodb
      .getDb()
      .db('task-oh')
      .collection('tasks')
      .insertOne(task);
    if (response.acknowledged) {
      console.log('Created successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || 'An error occurred while creating the task!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// update task by id in the database
const updateTask = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid task id to update a task.');
    }
    const taskId = new ObjectId(req.params.id);
    const task = {
      title: req.body.title,
      description: req.body.description,
      dueDate: new Date(req.body.dueDate),
      assignee: req.body.assignee,
      status: req.body.status,
      priority: req.body.priority,
      project: req.body.project
    };

    //validation
    const validationResponse = validation.taskValidation(task);

    if(validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse
      });
    }

    const response = await mongodb
      .getDb()
      .db('task-oh')
      .collection('tasks')
      .replaceOne({ _id: taskId }, task);
    console.log(response);
    if (response.modifiedCount === 1) {
      console.log('Updated successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(204).json(response).send;
    } else {
      res
        .status(500)
        .json(response.error || 'An error occurred while updating the task!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// delete contact by id in the database
const deleteTask = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid task id to delete a task.');
    }
    const taskId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('task-oh')
      .collection('tasks')
      .deleteOne({ _id: taskId });
    if (response.deletedCount === 1) {
      console.log('Deleted successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(response).send;
    } else {
      res
        .status(500)
        .json(response.error || 'An error occurred while deleting the task!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
