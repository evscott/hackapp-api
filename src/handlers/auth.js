const DAL = require('../dal/dal');
const JWT = require('../shared/jwt');

/**
 * @swagger
 * /auth/:
 *  post:
 *    description: Use to sign up a user
 *    parameters:
 *      - in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '201':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            user:
 *              type: object
 *              properties:
 *                uid:
 *                  type: string
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                email:
 *                  type: string
 *            token:
 *              type: string
 *      '400':
 *        description: 'Bad request'
 *      '500':
 *        description: 'Internal server error'
 */
let signUp = async (req, res) => {
    let firstName = req.body.firstName,
        lastName = req.body.lastName,
        email = req.body.email,
        password = req.body.password;

    if (firstName === undefined || lastName === undefined || email === undefined || password === undefined) {
        return res.status(400).send();
    }

    let signUpRes = await DAL.signUp(firstName, lastName, email, password);
    if (signUpRes.err) {
        return res.status(signUpRes.err).send();
    }

    let token = JWT.issueToken(signUpRes.user.uid, signUpRes.user.admin);

    return res.status(201).send({user: {
        uid: signUpRes.user.uid,
        firstName: signUpRes.user.first_name,
        lastName: signUpRes.user.last_name,
        email: signUpRes.user.email,
        admin: signUpRes.user.admin
    }, token: token});
};

/**
 * @swagger
 * /auth/:
 *  put:
 *    description: Use to sign in a user
 *    parameters:
 *      - in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            user:
 *              type: object
 *              properties:
 *                uid:
 *                  type: string
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                email:
 *                  type: string
 *            token:
 *              type: string
 *      '400':
 *        description: 'Bad request'
 *      '404':
 *        description: 'Not found'
 *      '500':
 *        description: 'Internal server error'
 */
let signIn = async (req, res) => {
    let email = req.body.email,
        password = req.body.password;

    if (email === undefined || password === undefined) {
        return res.status(400).send('must provide email and password');
    }

    let signInRes = await DAL.signInEmailPassword(email, password);
    if (signInRes.err) {
        return res.status(signInRes.err).send();
    }

    let token = JWT.issueToken(signInRes.user.uid, signInRes.user.admin);

    return res.status(200).send({user: {
        uid: signInRes.user.uid,
        firstName: signInRes.user.first_name,
        lastName: signInRes.user.last_name,
        email: signInRes.user.email,
        admin: signInRes.user.admin
    }, token: token});
};

module.exports = {
    signUp,
    signIn
};