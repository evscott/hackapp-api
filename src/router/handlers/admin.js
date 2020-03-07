const DAL = require('../../dal/dal');

/**
 * @swagger
 * /org/:
 *  post:
 *    description: Use to create an organization
 *    parameters:
 *      - name: ha-admin-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: organization
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            organizationName:
 *              type: string
 *    responses:
 *      '201':
 *        description: 'Success'
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 *      '500':
 *        description: 'Internal server error'
 */
let createOrganization = async (req, res) => {
    let name = req.body.name;

    if (name === undefined) {
        return res.status(400).send();
    }

    let createOrgRes = await DAL.createOrganization(name);
    if (createOrgRes.err) {
        return res.status(createOrgRes.err).send();
    }

    return res.status(201).send({org: createOrgRes.org})
};

/**
 * @swagger
 * /org/:
 *  put:
 *    description: Use to update an organization
 *    parameters:
 *      - name: ha-admin-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: organization
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            oldOrganizationName:
 *              type: string
 *            newOrganizationName:
 *              type: string
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
 *      '500':
 *        description: 'Internal server error'
 */
let updateOrganization = async (req, res) => {
    let oldName = req.body.oldName,
        newName = req.body.newName;

    if (oldName === undefined || newName === undefined) {
        return res.status(400).send();
    }

    let updateOrgRes = await DAL.updateOrganization(oldName, newName);
    if (updateOrgRes.err) {
        return res.status(updateOrgRes.err).send();
    }

    return res.status(200).send({org: updateOrgRes.org})
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
    console.log("creating hackathon?", req.body);

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

/**
 * @swagger
 * /hacks/:hid/reg/q/:
 *  post:
 *    description: Use to add a registration question
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
 *      - name: question
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
 */
let createHackathonRegQuestion = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/reg/q/:qid/:
 *  put:
 *    description: Use to update a registration question
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
 *      - name: qid
 *        in: path
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
let updateHackathonRegQuestion = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/reg/q/:qid/:
 *  delete:
 *    description: Use to delete a registration question
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
 *      - name: qid
 *        in: path
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
let deleteHackathonRegQuestion = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/reg/users/csv/:
 *  get:
 *    description: Get a user registration form
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
let getUserRegForm = async (req, res) => {

};

module.exports = {
    createOrganization,
    updateOrganization,
    createHackathon,
    updateHackathon,
    deleteHackathon,
    createHackathonDetails,
    updateHackathonDetails,
    createHackathonRegQuestion,
    updateHackathonRegQuestion,
    deleteHackathonRegQuestion,
    getUserRegForm
};