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
router.put('/hacks/:hid/details', JWT.validateAdminToken, Handlers.hack.updateHackathonDetails);
router.post('/hacks/:hid/reg/q', JWT.validateAdminToken, Handlers.reg.createRegQuestion);
router.put('/hacks/:hid/reg/q/:qid', JWT.validateAdminToken, Handlers.reg.updateRegQuestion);
router.delete('/hacks/:hid/reg/q/:qid', JWT.validateAdminToken, Handlers.reg.deleteRegQuestion);
router.get('/hacks/:hid/reg/users/csv', JWT.validateAdminToken, Handlers.reg.getUserRegForm);

module.exports = router;