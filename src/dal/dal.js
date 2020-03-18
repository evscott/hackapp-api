const auth = require('./auth');
const hack = require('./hack');
const org = require('./org');
const users = require('./users');


const DAL = {
    ...auth,
    ...hack,
    ...org,
    ...users
};

module.exports = DAL;