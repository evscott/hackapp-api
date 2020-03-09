const authentication = require('./authentication');
const hackathon = require('./hackathon');
const organization = require('./organization');
const registration = require('./registration');
const user = require('./user');


const Handlers = {
    auth: authentication,
    hack: hackathon,
    org: organization,
    reg: registration,
    user: user,
};

module.exports = Handlers;