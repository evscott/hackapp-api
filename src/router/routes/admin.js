const express = require('express');
const router = express.Router();
const handlers = require('../handlers/admin');


router.post('/org', handlers.createOrganization);
router.put('/org', handlers.updateOrganization);
router.post('/hacks', handlers.createHackathon);
router.put('/hacks/:hid', handlers.updateHackathon);
router.delete('/hacks/:hid', handlers.deleteHackathon);
router.post('/hacks/details', handlers.createHackathonDetails);
router.put('/hacks/:hid/details', handlers.updateHackathonDetails);
router.post('/hacks/:hid/reg/q', handlers.createHackathonRegQuestion);
router.put('/hacks/:hid/reg/q/:qid', handlers.updateHackathonRegQuestion);
router.delete('/hacks/:hid/reg/q/:qid', handlers.deleteHackathonRegQuestion);
router.get('/hacks/:hid/reg/users/csv', handlers.getUserRegForm);

module.exports = router;