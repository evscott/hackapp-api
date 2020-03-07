const auth = require('./auth');
const hackathon = require('./hackathon');
const org = require('./org');

const DAL = {
    ...auth,
    ...hackathon,
    ...org
};

module.exports = DAL;