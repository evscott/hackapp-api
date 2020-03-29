const express = require('express');
const router = express.Router();
const Handlers = require('../handlers/handlers');
const JWT = require('../shared/jwt');

router.post('/org', JWT.validateAdminToken, Handlers.org.createOrganization);
router.put('/org', JWT.validateAdminToken, Handlers.org.updateOrganization);
router.post('/hacks', JWT.validateAdminToken, Handlers.hack.createHackathonOverview);
router.put('/hacks/', JWT.validateAdminToken, Handlers.hack.updateHackathonOverview);
router.delete('/hacks/:hid', JWT.validateAdminToken, Handlers.hack.deleteHackathon);
router.post('/hacks/det', JWT.validateAdminToken, Handlers.hack.createHackathonDetails);
router.put('/hacks/det', JWT.validateAdminToken, Handlers.hack.updateHackathonDetail);
router.delete('/hacks/det/:did', JWT.validateAdminToken, Handlers.hack.deleteHackathonDetail);
router.post('/hacks/reg/quest', JWT.validateAdminToken, Handlers.reg.createRegQuestions);
router.put('/hacks/reg/quest', JWT.validateAdminToken, Handlers.reg.updateRegQuestion);
router.delete('/hacks/reg/quest/:qid', JWT.validateAdminToken, Handlers.reg.deleteRegQuestion);
router.post('/hacks/reg/opt', JWT.validateAdminToken, Handlers.reg.createRegOption);
router.put('/hacks/reg/opt', JWT.validateAdminToken, Handlers.reg.updateRegOption);
router.delete('/hacks/reg/opt/:oid', JWT.validateAdminToken, Handlers.reg.deleteRegOption);
router.get('/hacks/reg/ans/csv', JWT.validateAdminToken, Handlers.reg.getRegAnswersCSV);

module.exports = router;