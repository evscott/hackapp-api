const openRoutes = require('./routes/open');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const jwt = require('../shared/jwt');

function init(app) {
    app.use('/', openRoutes);
    app.use('/', jwt.validateUserToken, userRoutes);
    app.use('/', jwt.validateAdminToken, adminRoutes);
}

module.exports = {
    init,
};