const DAL = require('../../dal/dal');
const JWT = require('../../shared/jwt');

/**
 * @swagger
 * /org/:
 *  get:
 *    description: Use to request organization
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            organizationName:
 *              type: string
 *              example: Mount Allison
 */
let getOrganization = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:
 *  get:
 *    description: Use to request all hackathons
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            hackathons:
 *              type: string
 *              example: []
 */
let getHackathons = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/:
 *  get:
 *    description: Use to request a hackathon overview
 *    parameters:
 *      - name: hid
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            hackathon:
 *              type: object
 *      '400':
 *        description: 'Invalid syntax'
 *      '404':
 *        description: 'Not found'
 */
let getHackathon = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/details/:
 *  get:
 *    description: Use to request a hackathons details
 *    parameters:
 *      - name: hid
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            details:
 *              type: object
 *      '400':
 *        description: 'Invalid syntax'
 *      '404':
 *        description: 'Not found'
 */
let getHackathonDetails = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/reg/q/:
 *  get:
 *    description: Use to getHackathonRegQuestionrequest hackathon registration questions
 *    parameters:
 *      - name: hid
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *      - name: qid
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            question:
 *              type: object
 *      '400':
 *        description: 'Invalid syntax'
 *      '404':
 *        description: 'Not found'
 */
let getHackathonRegQuestions = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/reg/q/:qid/:
 *  get:
 *    description: Use to request a hackathon registration question using its ID
 *    parameters:
 *      - name: hid
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *      - name: qid
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            question:
 *              type: object
 *      '400':
 *        description: 'Invalid syntax'
 *      '404':
 *        description: 'Not found'
 */
let getHackathonRegQuestion = async (req, res) => {

};

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
 *            token:
 *              type: string
 *      '400':
 *        description: 'Invalid syntax'
 *      '404':
 *        description: 'Not found'
 *      '500'
 *        description: 'Internal server error'
 */
let signUp = async (req, res) => {

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
 *            token:
 *              type: string
 *      '400':
 *        description: 'Invalid syntax'
 *      '404':
 *        description: 'Not found'
 *      '500':
 *        description: 'Internal server error'
 */
let signIn = async (req, res) => {
    if (req.body.email == undefined || req.body.password == undefined) return res.status(400).send();

    let signInRes = await DAL.signInEmailPassword(req.body.email, req.body.password);
    if (signInRes.err) return res.status(signInRes.err).send();

    let token = JWT.issueUserToken(signInRes.user.uid);
    return res.status(200).send({user: signInRes.user, token: token});
};

module.exports = {
    getOrganization,
    getHackathons,
    getHackathon,
    getHackathonDetails,
    getHackathonRegQuestions,
    getHackathonRegQuestion,
    signUp,
    signIn
};