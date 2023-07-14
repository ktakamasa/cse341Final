const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const validation = require('../middleware/validate');

// get all comments from database
const getAllComments = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db('task-oh')
      .collection('comments')
      .find();
    result.toArray().then((comments) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(comments);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single comment from database
const getCommentById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid comment id to find a comment.');
    }
    const commentId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('task-oh')
      .collection('comments')
      .find({ _id: commentId });
    result.toArray().then((comments) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(comments[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create new comment
const createComment = async (req, res) => {
  try {
    const comment = {
      userName: req.body.userName,
      comment: req.body.comment,
      date: req.body.date,
      task: req.body.task,
      project: req.body.project
    };

    // validation
    const validationResponse = validation.commentValidation(comment);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationResponse
      });
    }

    const response = await mongodb
      .getDb()
      .db('task-oh')
      .collection('comments')
      .insertOne(comment);
    if (response.acknowledged) {
      console.log('Created successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || 'An error occurred while creating the comment!'
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// update comment by id in the database
const updateComment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid comment id to update a comment.');
    }
    const commentId = new ObjectId(req.params.id);
    const comment = {
      userName: req.body.userName,
      comment: req.body.comment,
      date: req.body.date,
      task: req.body.task,
      project: req.body.project
    };

    // validation
    const validationResponse = validation.commentValidation(comment);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationResponse
      });
    }

    const response = await mongodb
      .getDb()
      .db('task-oh')
      .collection('comments')
      .replaceOne({ _id: commentId }, comment);
    console.log(response);
    if (response.modifiedCount === 1) {
      console.log('Updated successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(204).json(response).send;
    } else {
      res
        .status(500)
        .json(
          response.error || 'An error occurred while updating the comment!'
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// delete contact by id in the database
const deleteComment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid comment id to delete a comment.');
    }
    const commentId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('task-oh')
      .collection('comments')
      .deleteOne({ _id: commentId });
    if (response.deletedCount === 1) {
      console.log('Deleted successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(response).send;
    } else {
      res
        .status(500)
        .json(
          response.error || 'An error occurred while deleting the comment!'
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};
