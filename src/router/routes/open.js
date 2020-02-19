const express = require('express');
const router = express.Router();
const handlers = require('../handlers/open');

router.get('/', handlers.test);

module.exports = router;