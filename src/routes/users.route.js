const express = require('express');
const router = express.Router();
const { getUser, createUser, login } = require('../controllers/users.controller');

router.get('/:id', getUser);
router.post('/login', login);
router.post('/signup', createUser);

module.exports = router;
