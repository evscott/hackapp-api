/**
 * @swagger
 * /org:
 *  get:
 *    description: Use to request all customers
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
 * /hacks/:
 *  get:
 *    description: Use to request a hackathon
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
 */
let getHackathon = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid:
 *  get:
 *    description: Use to request a hackathon registration question
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
 */
let getHackathonDetails = async (req, res) => {

};

/**
 * @swagger
 * /hacks/:hid/reg/q/:qid:
 *  get:
 *    description: Use to request a hackathon
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
 */
let getHackathonRegQuestion = async (req, res) => {

};

module.exports = {
    getOrganization: getOrganization,
    getHackathons: getHackathons,
    getHackathon: getHackathon,
    getHackathonDetails: getHackathonDetails,
    getHackathonRegQuestion: getHackathonRegQuestion,
};