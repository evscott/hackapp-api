const auth = require('./auth');
const hack = require('./hack');
const org = require('./org');
const reg = require('./reg');
const user = require('./user');


const Handlers = {
    auth: auth,
    hack: hack,
    org: org,
    reg: reg,
    user: user,
};

module.exports = Handlers;