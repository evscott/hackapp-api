const express = require('express');
const router = express.Router();
const handlers = require('../handlers/user');

router.get('/users', handlers.getUser);
router.put('/users/:uid', handlers.updateUser);
router.delete('/users', handlers.deleteUser);

module.exports = router;