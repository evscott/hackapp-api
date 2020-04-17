const auth = require('./auth');
const hack = require('./hack');
const org = require('./org');
const reg = require('./reg');
const users = require('./users');


const DAL = {
    ...auth,
    ...hack,
    ...org,
    ...reg,
    ...users
};

module.exports = DAL;