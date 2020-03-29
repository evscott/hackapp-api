const express = require('express');
const router = express.Router();
const Handlers = require('../handlers/handlers');

router.post('/auth', Handlers.auth.signUp);
router.put('/auth', Handlers.auth.signIn);
router.get('/org', Handlers.org.getOrganization);
router.get('/hacks/ov', Handlers.hack.getHackathonOverviews);
router.get('/hacks/ov/:hid', Handlers.hack.getHackathonOverview);
router.get('/hacks/det/:hid', Handlers.hack.getHackathonDetails);
router.get('/hacks/reg/:hid', Handlers.reg.getRegQuestions);


module.exports = router;