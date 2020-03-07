const express = require('express');
const router = express.Router();
const handlers = require('../handlers/user');
const JWT = require('../../shared/jwt');

router.get('/users', JWT.validateUserToken, handlers.getUser);
router.put('/users/:uid', JWT.validateUserToken, handlers.updateUser);
router.delete('/users', JWT.validateUserToken, handlers.deleteUser);

module.exports = router;