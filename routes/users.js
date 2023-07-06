const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
// const validation = require('../middleware/validate');
// const { requiresAuth } = require('express-openid-connect');
// const { isAuthenticated } = require('../middleware/authenticate');

// GET all users
router.get('/', usersController.getAllUsers);

// GET a single User
router.get('/:id', usersController.getUserById);

// POST a new User
router.post(
  '/',
  //   requiresAuth(),
  //   isAuthenticated,
  //   validation.saveUser,
  usersController.createUser
);

// PUT update data in an existing User
router.put(
  '/:id',
  //   requiresAuth(),
  //   isAuthenticated,
  //   validation.saveUser,
  usersController.updateUser
);

// DELETE a User
router.delete(
  '/:id',
  //   requiresAuth(),
  //   isAuthenticated,
  usersController.deleteUser
);

module.exports = router;
