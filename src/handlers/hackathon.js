const DAL = require('../dal/dal');

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
 *        description: 'Bad request'
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
 *        description: 'Bad request'
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
 *        description: 'Bad request'
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
 *        description: 'Bad request'
 *      '404':
 *        description: 'Not found'
 */
let getHackathonRegQuestion = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:
 *  post:
 *    description: Use to create a hackathon
 *    parameters:
 *      - name: ha-admin-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: hackathon
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *    responses:
 *      '201':
 *        description: 'Success'
 *        schema:
 *          type: object
 *          properties:
 *            hid:
 *              type: string
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 *      '500':
 *        description: 'Internal server error'
 */
let createHackathon = async (req, res) => {
    let name = req.body.name,
        startDate = req.body.startDate,
        endDate = req.body.endDate,
        location = req.body.location,
        maxReg = req.body.maxReg;

    if (name === undefined || startDate === undefined || endDate === undefined || location === undefined || maxReg === undefined){
        return res.status(400).send();
    }

    let createHackathonRes = await DAL.createHackathon(name, startDate, endDate, location, maxReg);
    if (createHackathonRes.err) {
        return res.status(createHackathonRes.err).send();
    }

    return res.status(201).send({hackathon: createHackathonRes.hackathon})
};


/**
 * @swagger
 * /hacks/:hid/:
 *  put:
 *    description: Use to update a hackathons overview
 *    parameters:
 *      - name: ha-admin-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: hackathon
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *    responses:
 *      '200':
 *        description: Success
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 *      '404':
 *        description: 'Not found'
 */
let updateHackathon = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/:
 *  delete:
 *    description: Use to delete a hackathon
 *    parameters:
 *      - name: ha-admin-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *    responses:
 *      '200':
 *        description: Success
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 *      '404':
 *        description: 'Not found'
 */
let deleteHackathon = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/details/:
 *  post:
 *    description: Use to create a hackathons initial details
 *    parameters:
 *      - name: ha-admin-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: details
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *    responses:
 *      '201':
 *        description: 'Success'
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 */
let createHackathonDetails = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/details/:
 *  put:
 *    description: Use to update a hackathons details
 *    parameters:
 *      - name: ha-admin-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: hid
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: details
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *    responses:
 *      '200':
 *        description: Success
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 *      '404':
 *        description: 'Not found'
 */

let updateHackathonDetails = async (req, res) => {

};

module.exports = {
    getHackathons,
    getHackathon,
    getHackathonDetails,
    getHackathonRegQuestions,
    getHackathonRegQuestion,
    createHackathon,
    updateHackathon,
    deleteHackathon,
    createHackathonDetails,
    updateHackathonDetails
};