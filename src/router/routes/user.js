const express = require('express');
const router = express.Router();
const handlers = require('../handlers/user');

router.get('/users', handlers.getUser);
router.put('/users', handlers.updateUser);
router.delete('/users', handlers.deleteUser);
router.get('/hacks/:hid/reg/users/csv', handlers.getUserRegForm);

module.exports = router;