const express = require('express');
const router = express.Router();
const Handlers = require('../handlers/handlers');
const JWT = require('../shared/jwt');

router.get('/users', JWT.validateUserToken, Handlers.user.getUser);
router.put('/users', JWT.validateUserToken, Handlers.user.updateUser);
router.delete('/users', JWT.validateUserToken, Handlers.user.deleteUser);
router.post('/hacks/reg/ans', JWT.validateUserToken, Handlers.reg.createRegAnswers);
router.put('/hacks/reg/ans', JWT.validateUserToken, Handlers.reg.updateRegAnswer);
router.get('/hacks/reg/ans/:hid', JWT.validateUserToken, Handlers.reg.getUserRegAnswers);
router.delete('/hacks/:hid', JWT.validateUserToken, Handlers.reg.deleteRegistrant);

module.exports = router;
