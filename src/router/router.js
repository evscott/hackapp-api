const openRoutes = require('./routes/open');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

function init(app) {
    app.use(openRoutes);
    app.use(userRoutes);
    app.use(adminRoutes);
}

module.exports = {
    init,
};