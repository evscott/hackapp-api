require('dotenv').config();

const Config = {
    AccessControl(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE'
        );
        res.header(
            'Access-Control-Allow-Headers',
            'X-Requested-With, content-type, x-access-token'
        );
        res.header('Access-Control-Allow-Credentials', true);

        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    },
    SwaggerOptions: {
        swaggerDefinition: {
            info: {
                title: "Hackapp API",
            }
        },
        apis: ["src/router/handlers/*.js"]
    }
};

module.exports = Config;