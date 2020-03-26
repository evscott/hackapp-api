const express = require('express');
const router = express.Router();
const Handlers = require('../handlers/handlers');
const JWT = require('../shared/jwt');

router.get('/', JWT.validateUserToken, Handlers.user.getUser);
router.put('/', JWT.validateUserToken, Handlers.user.updateUser);
router.delete('/', JWT.validateUserToken, Handlers.user.deleteUser);
router.post('/hacks/reg/ans', JWT.validateUserToken, Handlers.reg.createRegAnswer);
router.put('/hacks/reg/ans', JWT.validateUserToken, Handlers.reg.updateRegAnswer);
router.get('/hacks/reg/ans/:hid', JWT.validateAdminToken, Handlers.reg.getUserRegAnswers);

module.exports = router;