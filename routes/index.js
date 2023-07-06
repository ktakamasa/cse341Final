const router = require('express').Router();

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
