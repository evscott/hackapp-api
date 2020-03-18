const express = require('express');
const router = express.Router();
const Handlers = require('../handlers/handlers');

router.get('/org', Handlers.org.getOrganization);
router.get('/hacks', Handlers.hack.getHackathons);
router.get('/hacks/:hid', Handlers.hack.getHackathon);
router.get('/hacks/:hid/details', Handlers.hack.getHackathonDetails);
router.get('/hacks/:hid/reg/q', Handlers.hack.getHackathonRegQuestions);
router.get('/hacks/:hid/reg/q/:qid', Handlers.hack.getHackathonRegQuestion);
router.post('/auth', Handlers.auth.signUp);
router.put('/auth', Handlers.auth.signIn);

module.exports = router;