/**
 * @swagger
 * /org/:
 *  post:
 *    description: Use to create an organization
 *    parameters:
 *      - name: ha-api-token
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
 *    responses:
 *      '200':
 *        description: Success
 */
let createOrganization = async (req, res) => {

};

/**
 * @swagger
 * /org/:
 *  put:
 *    description: Use to update an organization
 *    parameters:
 *      - name: ha-api-token
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
 *    responses:
 *      '200':
 *        description: Success
 */
let updateOrganization = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:
 *  post:
 *    description: Use to create a hackathon
 *    parameters:
 *      - name: ha-api-token
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
 */
let createHackathon = async (req, res) => {

};


/**
 * @swagger
 * /hacks/:hid/:
 *  put:
 *    description: Use to update a hackathon
 *    parameters:
 *      - name: ha-api-token
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
 */
let updateHackathon = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/:
 *  delete:
 *    description: Use to delete a hackathon
 *    parameters:
 *      - name: ha-api-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *    responses:
 *      '200':
 *        description: Success
 */
let deleteHackathon = async (req, res) => {

};

/**
 * @swagger
 * /hacks/details/:
 *  post:
 *    description: Use to create a hackathons initial details
 *    parameters:
 *      - name: ha-api-token
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
 *      '200':
 *        description: Success
 */
let createHackathonDetails = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/details:
 *  put:
 *    description: Use to update a hackathons details
 *    parameters:
 *      - name: ha-api-token
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
 */
let updateHackathonDetails = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/reg/q:
 *  post:
 *    description: Use to update a registration question
 *    parameters:
 *      - name: ha-api-token
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
 *      '200':
 *        description: Success
 */
let createHackathonRegQuestion = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/reg/q/:qid:
 *  put:
 *    description: Use to update a registration question
 *    parameters:
 *      - name: ha-api-token
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
 */
let updateHackathonRegQuestion = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/reg/q/:qid:
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
 */
let deleteHackathonRegQuestion = async (req, res) => {

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
    deleteHackathonRegQuestion
};