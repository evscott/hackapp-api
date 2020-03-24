const DAL = require('../dal/dal');

/**
 * @swagger
 * /hacks/reg/q/:
 *  post:
 *    description: Use to create a registration question
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
 *    responses:
 *      '200':
 *        description: Success
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 */
let createRegQuestion = async (req, res) => {
    let hid = req.body.hid,
        question = req.body.question
        options = req.body.options;

    if (hid === undefined || question === undefined) {
        return res.status(400);
    }

    let createRegQuestionRes = await DAL.createRegQuestionTx(hid, question, options)
    if (createRegQuestionRes.err) {
        return res.status(createRegQuestion.err).send();
    }

    return res.status(201).send({regQuestion: createRegQuestionRes.question, regQuestionOptions: createRegQuestionRes.options})
};

/**
 * @swagger
 * /hacks/reg/q/:
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
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 *      '404':
 *        description: 'Not found'
 */
let updateRegQuestion = async (req, res) => {
    let qid = req.body.qid,
        question = req.body.question;

    if (qid === undefined || question === undefined) {
        return res.status(400);
    }

    let updateRegQuestionRes = await DAL.updateRegQuestion(qid, question)
    if (updateRegQuestionRes.err) {
        return res.status(updateRegQuestionRes.err).send();
    }

    return res.status(200).send({regQuestion: updateRegQuestionRes.question})
};

/**
 * @swagger
 * /hacks/reg/q/:
 *  delete:
 *    description: Use to delete a registration question
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
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 *      '404':
 *        description: 'Not found'
 */
let deleteRegQuestion = async (req, res) => {
    let qid = req.body.qid
    if (qid === undefined) {
        return res.status(400);
    }

    let deleteRegQuestionRes = await DAL.deleteRegQuestion(qid)
    if (deleteRegQuestionRes.err) {
        return res.status(deleteRegQuestionRes.err).send();
    }

    return res.status(200).send()
};

/**
 * @swagger
 * /hacks/reg/users/csv/:
 *  get:
 *    description: Get a user registration form
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
    createRegQuestion: createRegQuestion,
    updateRegQuestion: updateRegQuestion,
    deleteRegQuestion: deleteRegQuestion,
    getUserRegForm
};