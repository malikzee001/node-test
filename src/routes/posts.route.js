const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/posts.controller');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.auth, getPosts);
router.post('/', authMiddleware.auth, createPost);

module.exports = router;
