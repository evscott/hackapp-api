const auth = require('./auth');
const hackathons = require('./hackathons');
const organizations = require('./organizations');
const users = require('./users');


const DAL = {
    ...auth,
    ...hackathons,
    ...organizations,
    ...users
};

module.exports = DAL;