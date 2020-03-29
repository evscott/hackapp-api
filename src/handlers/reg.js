const DAL = require('../dal/dal');
const JWT = require('../shared/jwt');

/**
 * @swagger
 * /a/hacks/reg/quest/:
 *  post:
 *    description: Use to create registration questions
 *    parameters:
 *      - name: ha-api-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: questions
 *        in: body
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              hid:
 *                type: string
 *                format: uuid
 *              question:
 *                type: string
 *                format: uuid
 *              descr:
 *                type: string
 *              required:
 *                type: boolean
 *              index:
 *                type: number
 *              type:
 *                type: string
 *              options:
 *                type: array
 *                items:
 *                  type: string
 *                  properties:
 *                    oid: 
 *                      type: string
 *                      format: uuid
 *                    qid: 
 *                      type: string
 *                      format: uuid
 *                    option: 
 *                      type: string
 *                    index: 
 *                      type: number
 *    responses:
 *      '201':
 *        description: Success
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              qid:
 *                type: string
 *                format: uuid
 *              hid:
 *                type: string
 *                format: uuid
 *              question:
 *                type: string
 *              descr:
 *                type: string
 *              required:
 *                type: boolean
 *              index:
 *                type: number
 *              type:
 *                type: string
 *              options:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    oid:
 *                      type: string
 *                      format: uuid
 *                    qid:
 *                      type: string
 *                      format: uuid
 *                    option:
 *                      type: string
 *                    index:
 *                      type: number
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 */
let createRegQuestions = async (req, res) => {
    let questions = req.body.questions;

    if (questions === undefined) {
        return res.status(400).send();
    }

    let questionsCreated = [];

    for (q in questions) {
        let hid = questions[q].hid,
        question = questions[q].question,
        descr = questions[q].descr,
        required = questions[q].required,
        index = questions[q].index,
        type = questions[q].type,
        options = questions[q].options;

        if (hid === undefined || question === undefined || descr === undefined || required === undefined || type === undefined) {
            return res.status(400).send();
        }

        let createRegQuestionRes = await DAL.createRegQuestionTx(hid, question, descr, required, index, type, options)
        if (createRegQuestionRes.err) {
            return res.status(createRegQuestion.err).send();
        }

        questionCreated = createRegQuestionRes.question;
        questionCreated.options = options;

        questionsCreated.push(questionCreated);
    }

    return res.status(201).send(questionsCreated)
};

/**
 * @swagger
 * /a/hacks/reg/quest/:
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
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: question
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: descr
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: required
 *        in: body
 *        required: true
 *        schema:
 *          type: boolean
 *      - name: index
 *        in: body
 *        required: true
 *        schema:
 *          type: number
 *      - name: type
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            qid:
 *              type: string
 *              format: uuid
 *            hid:
 *              type: string
 *              format: uuid
 *            question:
 *              type: string
 *            descr:
 *              type: string
 *            required:
 *              type: boolean
 *            index:
 *              type: number
 *            type:
 *              type: string
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 */
let updateRegQuestion = async (req, res) => {
    let qid = req.body.qid,
        question = req.body.question,
        descr = req.body.descr,
        required = req.body.required,
        index = req.body.index,
        type = req.body.type;

    if (qid === undefined || question === undefined || descr === undefined || required === undefined || index === undefined || type === undefined) {
        return res.status(400).send();
    }

    let updateRegQuestionRes = await DAL.updateRegQuestion(qid, question, descr, required, index, type)
    if (updateRegQuestionRes.err) {
        return res.status(updateRegQuestionRes.err).send();
    }

    return res.status(200).send(updateRegQuestionRes.question)
};

/**
 * @swagger
 * /a/hacks/reg/quest/:qid/:
 *  delete:
 *    description: Use to delete a registration question
 *    parameters:
 *      - name: ha-api-token
 *        in: header
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
    let qid = req.query.qid
    if (qid === undefined) {
        return res.status(400).send();
    }

    let deleteRegQuestionRes = await DAL.deleteRegQuestion(qid)
    if (deleteRegQuestionRes.err) {
        return res.status(deleteRegQuestionRes.err).send();
    }

    return res.status(200).send()
};

/**
 * @swagger
 * /hacks/reg/:hid/:
 *  get:
 *    description: Use to request a hackathons registration questions
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
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  hid:
 *                    type: string
 *                    format: uuid
 *                  qid:
 *                    type: string
 *                    format: uuid
 *                  question:
 *                    type: string
 *                  desc:
 *                    type: string
 *                  required:
 *                    type: boolean
 *                  index:
 *                    type: number
 *                  options:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        oid:
 *                          type: string
 *                          format: uuid
 *                        qid:
 *                          type: string
 *                          format: uuid
 *                        option:
 *                          type: string
 *                        index:
 *                          type: number
 *      '400':
 *        description: 'Bad request'
 *      '404':
 *        description: 'Not found'
 */
let getRegQuestions = async (req, res) => {

    let hid = req.query.hid;

    if (hid === undefined){
        return res.status(400).send();
    }

    let getQuestionsRes = await DAL.getRegQuestions(hid);
    if (getQuestionsRes.err) {
        return res.status(getQuestionsRes.err).send();
    }

    let questions = [];
    for (i in getQuestionsRes.questions) {
        let question = getQuestionsRes.questions[i];

        getOptionsRes = await DAL.getRegOptions(question.qid);
        if (getOptionsRes.err) {
            return res.status(getOptionsRes.err).send();
        }

        question.options = getOptionsRes.options;
        questions.push(question);
    }

    return res.status(200).send(questions)
};

/**
 * @swagger
 * /a/hacks/reg/opt/:
 *  post:
 *    description: Use to create a registration option
 *    parameters:
 *      - name: ha-api-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: qid
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: option
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '201':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            oid:
 *              type: string
 *              format: uuid
 *            qid:
 *              type: string
 *              format: uuid
 *            option:
 *              type: string
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 */
let createRegOption = async (req, res) => {
    let qid = req.body.qid,
        option = req.body.option,
        index;

    if (qid === undefined || option === undefined || index === undefined) {
        return res.status(400).send();
    }
    
    let createregOptionRes = await DAL.createRegOption(qid, option, index)
    if (createregOptionRes. err) {
        return res.status(createregOptionRes.err).send();
    }

    return res.status(200).send(createregOptionRes.option)
};

/**
 * @swagger
 * /a/hacks/reg/opt/:
 *  post:
 *    description: Use to update a registration option
 *    parameters:
 *      - name: ha-api-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: oid
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: option
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            oid:
 *              type: string
 *              format: uuid
 *            qid:
 *              type: string
 *              format: uuid
 *            option:
 *              type: string
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 */
let updateRegOption = async (req, res) => {
    let oid = req.body.oid,
        option = req.body.option,
        index = req.body.index;

    if (oid === undefined || option === undefined || index === undefined) {
        return res.status(400).send();
    }
    
    let updateReqQuestionOptionRes = await DAL.updateRegOption(oid, index, option)
    if (updateReqQuestionOptionRes. err) {
        return res.status(updateReqQuestionOptionRes.err).send();
    }

    return res.status(200).send(updateReqQuestionOptionRes.option)
};

/**
 * @swagger
 * /a/hacks/reg/opt/:oid/:
 *  delete:
 *    description: Use to delete a registration option
 *    parameters:
 *      - name: ha-api-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: oid
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
let deleteRegOption = async (req, res) => {
    let oid = req.query.oid
    if (oid === undefined) {
        return res.status(400).send();
    }

    let deleteRegOptionRes = await DAL.deleteRegOption(oid)
    if (deleteRegOptionRes.err) {
        return res.status(deleteRegOptionRes.err).send();
    }

    return res.status(200).send()
};

/**
 * @swagger
 * /u/hacks/reg/ans/:
 *  post:
 *    description: Use to create a registration answer
 *    parameters:
 *      - name: ha-api-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: qid
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: oid
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: answer
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '201':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            aid:
 *              type: string
 *              format: uuid
 *            oid:
 *              type: string
 *              format: uuid
 *            qid:
 *              type: string
 *              format: uuid
 *            uid:
 *              type: string
 *              format: uuid
 *            answer:
 *              type: string
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have user privileges'
 */
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

    return res.status(201).send(createRegAnswerRes.answer)
};

/**
 * @swagger
 * /u/hacks/reg/ans/:
 *  put:
 *    description: Use to update a registration answer
 *    parameters:
 *      - name: ha-api-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: aid
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: oid
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: answer
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            aid:
 *              type: string
 *              format: uuid
 *            oid:
 *              type: string
 *              format: uuid
 *            qid:
 *              type: string
 *              format: uuid
 *            uid:
 *              type: string
 *              format: uuid
 *            answer:
 *              type: string
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have user privileges'
 */
let updateRegAnswer = async (req, res) => {    
    let aid = req.body.aid,
        oid = req.body.oid,
        answer = req.body.answer;

    if (aid === undefined) {
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
    
    let updateRegAnswerRes = await DAL.updateRegAnswer(aid, claims.uid, oid, answer)
    if (updateRegAnswerRes. err) {
        return res.status(updateRegAnswerRes.err).send();
    }

    return res.status(201).send(updateRegAnswerRes.answer)
};

/**
 * @swagger
 * /a/hacks/reg/users/csv/:hid/:
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
 *        schema:
 *          type: object
 *          properties:
 *            csv:
 *              type: string
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 *      '404':
 *        description: 'Not found'
 */
let getRegAnswersCSV = async (req, res) => {
    let hid = req.query.hid;

    if (hid === undefined) {
        return res.status(400).send();
    }

    let getRegAnswersRes = await DAL.getRegAnswers(hid);
    if (getRegAnswersRes. err) {
        return res.status(getRegAnswersRes.err).send();
    }

    return res.status(200).send(getRegAnswersRes.answers)
};

/**
 * @swagger
 * /u/hacks/reg/users/csv/:hid/:
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
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              question:
 *                type: string
 *              answer:
 *                type: string
 *              uid:
 *                type: string
 *                format: uuid
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have user privileges'
 *      '404':
 *        description: 'Not found'
 */
let getUserRegAnswers = async (req, res) => {
    let hid = req.query.hid;

    if (hid === undefined) {
        return res.status(400).send();
    }

    let t = req.headers['ha-api-token'];
    let claims = await JWT.getUIDFromToken(t);
    if (claims.err) {
        res.status(500).send(claims.err)
    }

    let getRegAnswersRes = await DAL.getUserRegAnswers(hid, claims.uid);
    if (getRegAnswersRes. err) {
        return res.status(getRegAnswersRes.err).send();
    }

    return res.status(200).send(getRegAnswersRes.answers)
};

module.exports = {
    createRegQuestions,
    updateRegQuestion,
    deleteRegQuestion,
    getRegQuestions,
    createRegOption,
    updateRegOption,
    deleteRegOption,
    createRegAnswer,
    updateRegAnswer,
    getRegAnswersCSV,
    getUserRegAnswers
};