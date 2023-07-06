const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// get all projects from database
const getAllProjects = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db('task-oh')
      .collection('projects')
      .find();
    result.toArray().then((projects) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(projects);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single project from database
const getProjectById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid project id to find a project.');
    }
    const projectId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('task-oh')
      .collection('projects')
      .find({ _id: projectId });
    result.toArray().then((projects) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(projects[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create new project
const createProject = async (req, res) => {
  try {
    const project = {
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      tasks: req.body.tasks
    };

    const response = await mongodb
      .getDb()
      .db('task-oh')
      .collection('projects')
      .insertOne(project);
    if (response.acknowledged) {
      console.log('Created successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || 'An error occurred while creating the project!'
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// update project by id in the database
const updateProject = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid project id to update a project.');
    }
    const projectId = new ObjectId(req.params.id);
    const project = {
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      tasks: req.body.tasks
    };
    const response = await mongodb
      .getDb()
      .db('task-oh')
      .collection('projects')
      .replaceOne({ _id: projectId }, project);
    console.log(response);
    if (response.modifiedCount === 1) {
      console.log('Updated successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(204).json(response).send;
    } else {
      res
        .status(500)
        .json(
          response.error || 'An error occurred while updating the project!'
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// delete contact by id in the database
const deleteProject = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid project id to delete a project.');
    }
    const projectId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('task-oh')
      .collection('projects')
      .deleteOne({ _id: projectId });
    if (response.deletedCount === 1) {
      console.log('Deleted successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(response).send;
    } else {
      res
        .status(500)
        .json(
          response.error || 'An error occurred while deleting the project!'
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
