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
        if (process.env.PROD) {
            console.log(`${req.ip} ${req.method} ${req.url}`);
        }
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        }
        next();
    },
    SwaggerOptions: {
        swaggerDefinition: {
            info: {
                title: "Hackapp API",
            }
        },
        apis: ["src/handlers/*.js"]
    },
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    signOptions: {
        expiresIn: '12h',
        algorithm: 'RS256'
    },
    verifyOptions: {
        expiresIn: '12h',
        algorithm: ['RS256']
    },
};

module.exports = Config;