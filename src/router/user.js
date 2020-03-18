const express = require('express');
const router = express.Router();
const Handlers = require('../handlers/handlers');
const JWT = require('../shared/jwt');

router.get('/users', JWT.validateUserToken, Handlers.user.getUser);
router.put('/users', JWT.validateUserToken, Handlers.user.updateUser);
router.delete('/users', JWT.validateUserToken, Handlers.user.deleteUser);

module.exports = router;