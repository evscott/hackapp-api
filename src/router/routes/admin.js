const express = require('express');
const router = express.Router();
const handlers = require('../handlers/admin');
const JWT = require('../../shared/jwt');

router.post('/org', JWT.validateAdminToken, handlers.createOrganization);
router.put('/org', JWT.validateAdminToken, handlers.updateOrganization);
router.post('/hacks', JWT.validateAdminToken, handlers.createHackathon);
router.put('/hacks/:hid', JWT.validateAdminToken, handlers.updateHackathon);
router.delete('/hacks/:hid', JWT.validateAdminToken, handlers.deleteHackathon);
router.post('/hacks/details', JWT.validateAdminToken, handlers.createHackathonDetails);
router.put('/hacks/:hid/details', JWT.validateAdminToken, handlers.updateHackathonDetails);
router.post('/hacks/:hid/reg/q', JWT.validateAdminToken, handlers.createHackathonRegQuestion);
router.put('/hacks/:hid/reg/q/:qid', JWT.validateAdminToken, handlers.updateHackathonRegQuestion);
router.delete('/hacks/:hid/reg/q/:qid', JWT.validateAdminToken, handlers.deleteHackathonRegQuestion);
router.get('/hacks/:hid/reg/users/csv', JWT.validateAdminToken, handlers.getUserRegForm);

module.exports = router;