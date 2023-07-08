const express = require('express');
const router = express.Router();
const authenticateController = require('../controllers/authenticate');

// req.isAuthenticated is provided from the auth router
router.get('/', authenticateController.loginLogout);

module.exports = router;
