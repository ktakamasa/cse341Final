const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
// const validation = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all comments
router.get('/', commentsController.getAllComments);

// GET a single Comment
router.get('/:id', commentsController.getCommentById);

// POST a new Comment
router.post(
  '/',
  requiresAuth(),
  isAuthenticated,
  //   validation.saveComment,
  commentsController.createComment
);

// PUT update data in an existing Comment
router.put(
  '/:id',
  requiresAuth(),
  isAuthenticated,
  //   validation.saveComment,
  commentsController.updateComment
);

// DELETE a Comment
router.delete(
  '/:id',
  requiresAuth(),
  isAuthenticated,
  commentsController.deleteComment
);

module.exports = router;
