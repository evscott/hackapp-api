const openRoutes = require('./open');
const userRoutes = require('./user');
const adminRoutes = require('./admin');

function init(app) {
    app.use(openRoutes);
    app.use('/u', userRoutes);
    app.use('/a', adminRoutes);
}

module.exports = {
    init,
};