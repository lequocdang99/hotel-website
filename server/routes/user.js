const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
//Get user
router.get('/login/:email/:password', userController.getUser);
//Create new user
router.post('/signup', userController.createUser);
//Get all users
router.get('/', userController.getAllUsers);

module.exports = router;
