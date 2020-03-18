const openRoutes = require('./open');
const userRoutes = require('./user');
const adminRoutes = require('./admin');

function init(app) {
    app.use(openRoutes);
    app.use(userRoutes);
    app.use(adminRoutes);
}

module.exports = {
    init,
};