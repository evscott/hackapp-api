const express = require('express');
const router = express.Router();
const Handlers = require('../handlers/handlers');
const JWT = require('../shared/jwt');

router.post('/org', JWT.validateAdminToken, Handlers.org.createOrganization);
router.put('/org', JWT.validateAdminToken, Handlers.org.updateOrganization);
router.post('/hacks', JWT.validateAdminToken, Handlers.hack.createHackathon);
router.put('/hacks/:hid', JWT.validateAdminToken, Handlers.hack.updateHackathon);
router.delete('/hacks/:hid', JWT.validateAdminToken, Handlers.hack.deleteHackathon);
router.post('/hacks/details', JWT.validateAdminToken, Handlers.hack.createHackathonDetails);
router.put('/hacks/details', JWT.validateAdminToken, Handlers.hack.updateHackathonDetails);
router.post('/hacks/reg/q', JWT.validateAdminToken, Handlers.reg.createRegQuestion);
router.put('/hacks/reg/q', JWT.validateAdminToken, Handlers.reg.updateRegQuestion);
router.delete('/hacks/reg/q', JWT.validateAdminToken, Handlers.reg.deleteRegQuestion);
router.post('/hacks/reg/q/o', JWT.validateAdminToken, Handlers.reg.createRegOption);
router.put('/hacks/reg/q/o', JWT.validateAdminToken, Handlers.reg.updateRegOption);
router.delete('/hacks/reg/q/o', JWT.validateAdminToken, Handlers.reg.deleteRegOption);
router.post('/hacks/reg/a', JWT.validateAdminToken, Handlers.reg.createRegAnswer);
router.get('/hacks/reg/users/csv', JWT.validateAdminToken, Handlers.reg.getUserRegForm);

module.exports = router;