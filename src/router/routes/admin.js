const express = require('express');
const router = express.Router();
const handlers = require('../handlers/admin');


router.post('/org', handlers.createOrganization);
router.put('/org', handlers.updateOrganization);
router.post('/hacks', handlers.createHackathon);
router.put('/hacks/:hid', handlers.updateHackathon);
router.delete('/hacks/:hid', handlers.deleteHackathon);
router.post('/hacks/:hid/details', handlers.createHackathonDetails);
router.put('/hacks/:hid/details', handlers.updateHackathonDetails);
router.post('/hacks/:hid/reg/question', handlers.createHackathonRegQuestion);
router.put('/hacks/:hid/reg/question/:qid', handlers.updateHackathonRegQuestion);
router.delete('/hacks/:hid/reg/question/:qid', handlers.deleteHackathonRegQuestion);

module.exports = router;