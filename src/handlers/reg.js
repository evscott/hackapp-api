const DAL = require('../dal/dal');
const JWT = require('../shared/jwt');

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
        return res.status(400).send();
    }

    let createRegQuestionRes = await DAL.createRegQuestionTx(hid, question, options)
    if (createRegQuestionRes.err) {
        return res.status(createRegQuestion.err).send();
    }

    return res.status(201).send({regQuestion: createRegQuestionRes.question, regOptions: createRegQuestionRes.options})
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
        return res.status(400).send();
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
        return res.status(400).send();
    }

    let deleteRegQuestionRes = await DAL.deleteRegQuestion(qid)
    if (deleteRegQuestionRes.err) {
        return res.status(deleteRegQuestionRes.err).send();
    }

    return res.status(200).send()
};

// TODO
let createRegOption = async (req, res) => {
    let qid = req.body.qid,
        option = req.body.option;

    if (qid === undefined || option === undefined) {
        return res.status(400).send();
    }
    
    let createregOptionRes = await DAL.createRegOption(qid, option)
    if (createregOptionRes. err) {
        return res.status(createregOptionRes.err).send();
    }

    return res.status(200).send({regOption: createregOptionRes.option})
};

// TODO
let updateRegOption = async (req, res) => {
    let oid = req.body.oid,
        option = req.body.option;

    if (oid === undefined || option === undefined) {
        return res.status(400).send();
    }
    
    let updateReqQuestionOptionRes = await DAL.updateRegOption(oid, option)
    if (updateReqQuestionOptionRes. err) {
        return res.status(updateReqQuestionOptionRes.err).send();
    }

    return res.status(200).send({regOption: updateReqQuestionOptionRes.option})
};

// TODO
let deleteRegOption = async (req, res) => {
    let oid = req.body.oid
    if (oid === undefined) {
        return res.status(400).send();
    }

    let deleteRegOptionRes = await DAL.deleteRegOption(oid)
    if (deleteRegOptionRes.err) {
        return res.status(deleteRegOptionRes.err).send();
    }

    return res.status(200).send()
};

// TODO
let createRegAnswer = async (req, res) => {    
    let qid = req.body.qid,
        oid = req.body.oid,
        answer = req.body.answer;

    if (qid === undefined) {
        return res.status(400).send();
    }
    if (oid === undefined && answer === undefined) {
        return res.status(400).send();
    }

    let t = req.headers['ha-api-token'];
    let claims = await JWT.getUIDFromToken(t);
    if (claims.err) {
        res.status(500).send(claims.err)
    }
    
    let createRegAnswerRes = await DAL.createRegAnswer(qid, claims.uid, oid, answer)
    if (createRegAnswerRes. err) {
        return res.status(createRegAnswerRes.err).send();
    }

    return res.status(201).send({regAnswer: createRegAnswerRes.answer})
};

// TODO
let updateRegAnswer = async (req, res) => {
    console.log('createRegAnswer');
    
    let aid = req.body.aid,
        oid = req.body.oid,
        answer = req.body.answer;

    if (aid === undefined) {
        return res.status(400).send();
    }
    if (oid === undefined && answer === undefined) {
        return res.status(400).send();
    }
    
    let updateRegAnswerRes = await DAL.updateRegAnswer(aid, oid, answer)
    if (updateRegAnswerRes. err) {
        return res.status(updateRegAnswerRes.err).send();
    }

    return res.status(201).send({regAnswer: updateRegAnswerRes.answer})
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
    createRegQuestion,
    updateRegQuestion,
    deleteRegQuestion,
    createRegOption,
    updateRegOption,
    deleteRegOption,
    createRegAnswer,
    getUserRegForm
};