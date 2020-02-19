const express = require('express');
const router = express.Router();
const handlers = require('../handlers/user');

router.get('/', handlers.test);

module.exports = router;