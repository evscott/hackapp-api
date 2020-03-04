const auth = require('./auth');
const org = require('./org');

const DAL = {
    ...auth,
    ...org
};

module.exports = DAL;