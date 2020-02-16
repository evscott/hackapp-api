const testRoutes = require('./routes/test');

function init(app) {
    app.use('/', testRoutes);
}

module.exports = {
    init,
};