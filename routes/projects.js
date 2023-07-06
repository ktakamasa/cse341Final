const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
// const validation = require('../middleware/validate');
// const { requiresAuth } = require('express-openid-connect');
// const { isAuthenticated } = require('../middleware/authenticate');

// GET all projects
router.get('/', projectsController.getAllProjects);

// GET a single Project
router.get('/:id', projectsController.getProjectById);

// POST a new Project
router.post(
  '/',
  //   requiresAuth(),
  //   isAuthenticated,
  //   validation.saveProject,
  projectsController.createProject
);

// PUT update data in an existing Project
router.put(
  '/:id',
  //   requiresAuth(),
  //   isAuthenticated,
  //   validation.saveProject,
  projectsController.updateProject
);

// DELETE a Project
router.delete(
  '/:id',
  //   requiresAuth(),
  //   isAuthenticated,
  projectsController.deleteProject
);

module.exports = router;
