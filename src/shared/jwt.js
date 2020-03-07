const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Validates user api JWT.
 *
 * If token is invalid (cannot be decoded): return status 500 and error
 * If token is not in header: return status 401
 */
let validateUserToken = (req, res, next) => {
    let token = req.headers['ha-user-token'];

    if (token) {
        jwt.verify(token, config.userPublicKey, config.verifyOptions, (err) => {
            if (err) {
                if (err.message === 'jwt expired') {
                    return res.status(401).send({err: err.message});
                }
                if (err.message === 'invalid signature') {
                    return res.status(403).send({err: err.message});
                }
            }

            return next()
        });
    }
    else
        return res.status(401).send();
};

/**
 * Validates admin api JWT.
 *
 * If token is invalid (cannot be decoded): return status 500 and error
 * If token is not in header: return status 401
 */
let validateAdminToken = (req, res, next) => {
    let token = req.headers['ha-admin-token'];

    console.log('validating admin token', req);

    if (token) {
        jwt.verify(token, config.adminPublicKey, config.verifyOptions, (err) => {
            if (err) {
                if (err.message === 'jwt expired') {
                    return res.status(401).send({err: err.message});
                }
                if (err.message === 'invalid signature') {
                    return res.status(403).send({err: err.message});
                }
            }

            return next()
        });
    }
    else {
        return res.status(401).send();
    }
};

/**
 * Validates user API request by decoding JWT and comparing decoded UUID against query param UUID.
 * If token is invalid (cannot be decoded): return status 500 and error
 *
 * If token is invalid (cannot be decoded): return status 500 and error
 * If token is not in header: return status 401
 */
let validateUserRequest = (req, res, next) => {
    let token = req.headers['ha-user-token'];
    let uid = req.query.uid;

    if (token) {
        jwt.verify(token, config.userPublicKey, config.verifyOptions, (err, decoded) => {
            if (err)
                res.status(500).send(err);
            if (decoded.uid !== uid)
                res.status(403).send();
            next();
        });
    }

    return res.status(401).send();
};

/**
 * Issues a user token with an encoded UID.
 */
let issueUserToken = (uid) => {
    return jwt.sign({uid: uid}, config.userPrivateKey, config.signOptions);
};

/**
 * Issues an admin token with an encoded UID.
 */
let issueAdminToken = (uid) => {
    return jwt.sign({uid: uid}, config.adminPrivateKey, config.signOptions);
};

module.exports = {
    validateUserToken,
    validateAdminToken,
    validateUserRequest,
    issueUserToken,
    issueAdminToken
};