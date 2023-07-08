const router = require('express').Router();
const authenticator = require('../middleware/authenticate');
const { auth } = require('express-openid-connect');

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(authenticator.config));

// Use Authenticate
router.use('/', require('./authenticate'));

// Swagger
router.use('/', require('./swagger'));

// Users
router.use('/users', require('./users'));

// Projects
router.use('/projects', require('./projects'));

// Tasks
router.use('/tasks', require('./tasks'));

// Comments
router.use('/comments', require('./comments'));

module.exports = router;
