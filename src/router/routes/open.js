const express = require('express');
const router = express.Router();
const handlers = require('../handlers/open');

router.get('/org', handlers.getOrganization);
router.get('/hacks', handlers.getHackathons);
router.get('/hacks/:hid', handlers.getHackathon);
router.get('/hacks/:hid/details', handlers.getHackathonDetails);
router.get('/hacks/:hid/reg/q/:qid', handlers.getHackathonRegQuestion);
router.post('/auth', handlers.signUp);
router.put('/auth', handlers.signIn);


module.exports = router;