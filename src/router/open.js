const express = require('express');
const router = express.Router();
const Handlers = require('../handlers/handlers');

router.post('/auth', Handlers.auth.signUp);
router.put('/auth', Handlers.auth.signIn);
router.get('/org', Handlers.org.getOrganization);
router.get('/hacks', Handlers.hack.getHackathons);
router.get('/hacks/:hid', Handlers.hack.getHackathon);
router.get('/hacks/det/:hid', Handlers.hack.getHackathonDetails);

module.exports = router;