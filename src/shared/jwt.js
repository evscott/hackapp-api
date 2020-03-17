const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Validates user api JWT.
 *
 * If token is expired: return status 401
 * If token is signed by invalid signature: return status 403
 * If token is valid user token: proceed
 */
let validateUserToken = (req, res, next) => {
    let token = req.headers['ha-api-token'];

    if (token) {
        jwt.verify(token, config.publicKey, config.verifyOptions, (err) => {
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
 * If token is expired: return status 401
 * If token is signed by invalid signature: return status 403
 * If token is not an admin token: return status 403
 * If token is valid admin token: proceed
 */
let validateAdminToken = (req, res, next) => {
    let token = req.headers['ha-api-token'];

    if (token) {
        jwt.verify(token, config.publicKey, config.verifyOptions, (err, decoded) => {
            if (err) {
                if (err.message === 'jwt expired') {
                    return res.status(401).send({err: err.message});
                }
                if (err.message === 'invalid signature') {
                    return res.status(403).send({err: err.message});
                }
            }

            if (!decoded.admin) {
                return res.status(403).send();
            }

            return next()
        });
    }
    else {
        return res.status(401).send();
    }
};

/**
 * Issues an api token with an encoded UID and admin flag.
 */
let issueToken = (uid, admin=false) => {
    return jwt.sign({uid: uid, admin: admin}, config.privateKey, config.signOptions);
};

/**
 * Get UID from decoding admin or user token
 */
let getUIDFromToken = async (token) => {
    let err, decoded = await jwt.verify(token, config.publicKey, config.verifyOptions);
    if (err) {
        return { uid: null, err: err };
    }

    return { uid: decoded.uid, err: null };
};

module.exports = {
    validateUserToken,
    validateAdminToken,
    issueToken,
    getUIDFromToken
};