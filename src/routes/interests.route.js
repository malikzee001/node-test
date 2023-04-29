const express = require('express');
const router = express.Router();
const { getInterests, postInterests } = require('../controllers/interests.controller');

router.get('/', getInterests);
router.post('/', postInterests);

module.exports = router;
