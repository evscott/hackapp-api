const DAL = require('../dal/dal');
const JWT = require('../shared/jwt');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;

/**
 * @swagger
 * /a/hacks/reg/:
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
 *              question:
 *                type: string
 *                format: uuid
 *              descr:
 *                type: string
 *              required:
 *                type: boolean
 *              type:
 *                type: string
 *              options:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    option: 
 *                      type: string
 *                      format: uuid
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
let createRegForm = async (req, res) => {
    let questions = req.body.questions;

    if (questions === undefined) {
        return res.status(400).send();
    }

    let createQuestionsRes = await DAL.createRegQuestions(questions);
    if (createQuestionsRes.err) {
        return res.status(createQuestionsRes.err).send();
    }

    return res.status(201).send({ questionsCreated: createQuestionsRes.questions, optionsCreated: createQuestionsRes.options })
};

/**
 * @swagger
 * /a/hacks/reg/:
 *  put:
 *    description: Use to update registration questions
 *    parameters:
 *      - name: ha-api-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: questionsToCreate
 *        in: body
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              qid:
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
 *                    option: 
 *                      type: string
 *                    index: 
 *                      type: number
 *      - name: questionsToUpdate
 *        in: body
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              qid:
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
 *      - name: optionsToCreate
 *        in: body
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              qid:
 *                type: string
 *                format: uuid
 *              option:
 *                type: string
 *              index:
 *                type: number
 *      - name: questionsToBeDeleted
 *        in: body
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *            format: uuid
 *      - name: optionsToUpdate
 *        in: body
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              oid:
 *                type: string
 *                format: uuid
 *              option:
 *                type: string
 *              index:
 *                type: number
 *      - name: optionsToDelete
 *        in: body
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *            format: uuid
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              questionsCreated:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    qid:
 *                      type: string
 *                      format: uuid
 *                    hid:
 *                      type: string
 *                      format: uuid
 *                    question:
 *                      type: string
 *                    descr:
 *                      type: string    
 *                    index:
 *                      type: number
 *                    required:
 *                      type: boolean
 *              questionsUpdated:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    qid:
 *                      type: string
 *                      format: uuid
 *                    hid:
 *                      type: string
 *                      format: uuid
 *                    question:
 *                      type: string
 *                    descr:
 *                      type: string    
 *                    index:
 *                      type: number
 *                    required:
 *                      type: boolean
 *              questionsDeleted:
 *                type: array
 *                items:
 *                  type: string
 *                  format: uuid
 *              optionsCreated:
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
 *              optionsUpdated:
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
 *              optionsDeleted:
 *                type: array
 *                items:
 *                  type: string
 *                  format: uuid   
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 */
let updateRegForm = async (req, res) => {
    let questionsToCreate = req.body.questionsToCreate,       
        questionsToUpdate = req.body.questionsToUpdate,
        questionsToDelete = req.body.questionsToDelete,
        optionsToCreate = req.body.optionsToCreate,
        optionsToUpdate = req.body.optionsToUpdate,
        optionsToDelete = req.body.optionsToDelete;

    let questionsCreated = [],
        questionsUpdated = [],
        questionsDeleted = [],
        optionsCreated = [],
        optionsUpdated = [],
        optionsDeleted = [];

    if (questionsToCreate) {
        createQuestionsRes = await DAL.createRegQuestions(questionsToCreate);
        if (createQuestionsRes.err) {
            return res.status(createQuestionsRes.err).send();
        }

        questionsCreated = createQuestionsRes.questions;
        optionsCreated = createQuestionsRes.options;
    }

    if (questionsToUpdate) {
        updateQuestionsRes = await DAL.updateRegQuestions(questionsToUpdate);
        if (updateQuestionsRes.err) {
            return res.status(updateQuestionsRes.err).send();
        }

        questionsUpdated = updateQuestionsRes.questions;
    }

    if (questionsToDelete) {
        for (const qid of questionsToDelete) {
            let deleteQuestionRes = await DAL.deleteRegQuestion(qid);
            if (deleteQuestionRes.err) {
                return res.status(deleteQuestionRes.err).send();
            }

            questionsDeleted.push(qid)
        }
    }

    if (optionsToCreate) {
        createOptionsRes = await DAL.createRegOptions(optionsToCreate)
        if (createOptionsRes.err) {
            return res.status(createOptionsRes.err).send();
        }

        optionsCreated = optionsCreated.concat(createOptionsRes.options);
    }
    
    if (optionsToUpdate) {
        updateOptionsRes = await DAL.updateRegOptions(optionsToUpdate)
        if (updateOptionsRes.err) {
            return res.status(updateQuestionsRes.err).send();
        } 

        optionsUpdated = updateOptionsRes.options;
    }
    
    if (optionsToDelete) {
        for (const oid of optionsToDelete) {
            let deleteOptionRes = await DAL.deleteRegOption(oid);
            if (deleteOptionRes.err) {
                return res.status(deleteOptionRes.err).send();
            }
            optionsDeleted.push(oid)
        }
    }

    return res.status(200).send({
        questionsCreated: optionsCreated,
        questionsUpdated: optionsUpdated,
        questionsDeleted: optionsDeleted,
        optionsCreated: optionsCreated,
        optionsUpdated: optionsUpdated,
        optionsDeleted: optionsDeleted,
    })
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
    let qid = req.query.qid;
    if (qid === undefined) {
        return res.status(400).send();
    }

    let deleteRegQuestionRes = await DAL.deleteRegQuestion(qid);
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
        index = req.body.index;

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
 *      - name: answers
 *        in: body
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              qid:
 *                type: string
 *                format: uuid
 *              oid:
 *                type: string
 *                format: uuid
 *              answer:
 *                type: string
 *    responses:
 *      '201':
 *        description: Success
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              aid:
 *                type: string
 *                format: uuid
 *              oid:
 *                type: string
 *                format: uuid
 *              uid:
 *                type: string
 *                format: uuid
 *              answer:
 *                type: string
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have user privileges'
 */
let createRegAnswers = async (req, res) => {    
    let answers = req.body.answers;

    if (answers === undefined) {
        return res.status(400).send();
    }

    let t = req.headers['ha-api-token'];
    let claims = await JWT.getUIDFromToken(t);
    if (claims.err) {
        res.status(500).send(claims.err)
    }
    
    let createRegAnswersRes = await DAL.createRegAnswers(claims.uid, answers)
    if (createRegAnswersRes.err) {
        return res.status(createRegAnswersRes.err).send();
    }

    return res.status(201).send(createRegAnswersRes.answers)
};


/**
 * @swagger
 * /u/hacks/reg/ans:
 *  put:
 *    description: Use to update registration answers
 *    parameters:
 *      - name: ha-api-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: answersToCreate
 *        in: body
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              qid:
 *                type: string
 *                format: uuid
 *              oid:
 *                type: string
 *                format: uuid
 *              answer:
 *                type: string
 *      - name: answersToUpdate
 *        in: body
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              aid:
 *                type: string
 *                format: uuid
 *              oid:
 *                type: string
 *                format: uuid
 *              answer:
 *                type: string
 *      - name: answersToDelete
 *        in: body
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *            format: uuid
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              answersCreated:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    aid:
 *                      type: string
 *                      format: uuid
 *                    qid:
 *                      type: string
 *                      format: uuid
 *                    oid:
 *                      type: string
 *                      format: uuid
 *                    answer:
 *                      type: string
 *              answersUpdated:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    aid:
 *                      type: string
 *                      format: uuid
 *                    qid:
 *                      type: string
 *                      format: uuid
 *                    oid:
 *                      type: string
 *                      format: uuid
 *                    answer:
 *                      type: string
 *              answersDeleted:
 *                type: array
 *                items:
 *                  type: string
 *                  format: uuid
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have user privileges'
 */
let updateRegAnswer = async (req, res) => {    
    let answersToBeCreated = req.body.answersToBeCreated,
        answersToBeUpdated = req.body.answersToBeUpdated,
        answersToBeDeleted = req.body.answersToBeDeleted;

    let answersCreated = [],
        answersUpdated = [],
        answersDeleted = [];

    let t = req.headers['ha-api-token'];
    let claims = await JWT.getUIDFromToken(t);
    if (claims.err) {
        res.status(500).send(claims.err)
    }
    let uid = claims.uid;
    
    if (answersToBeCreated) {
        let createRegAnswersRes = await DAL.createRegAnswers(uid, answersToBeCreated)
        if (createRegAnswersRes.err) {
            return res.status(createRegAnswersRes.err).send();
        }
        answersCreated = createRegAnswersRes.answers;
    }

    if (answersToBeUpdated) {
        let updateRegAnswersRes = await DAL.updateRegAnswer(uid, answersToBeUpdated)
        if (updateRegAnswersRes. err) {
            return res.status(updateRegAnswersRes.err).send();
        }
        answersUpdated = updateRegAnswersRes.answers;
    }

    if (answersToBeDeleted) {
        for (const aid of answersToBeDeleted) {
            let deleteAnswerRes = await DAL.deleteRegAnswer(aid);
            if (deleteAnswerRes.err) {
                return res.status(deleteAnswerRes.err).send();
            }
            answersDeleted.push(aid)
        }
    }

    return res.status(200).send({
        answersCreated: answersCreated,
        answersUpdated: answersUpdated,
        answersDeleted: answersDeleted
    })
};

/**
 * @swagger
 * /a/hacks/reg/csv/:hid/:
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

    const csvStringifier = createCsvStringifier({
        header: [
            {id: 'question', title: 'QUESTION'},
            {id: 'answer', title: 'ANSWER'},
            {id: 'uid', title: 'UID'},
            {id: 'firstName', title: 'FIRST_NAME'},
            {id: 'lastName', title: 'LAST_NAME'},
            {id: 'email', title: 'EMAIL'},
        ]
    });
    let csv = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(getRegAnswersRes.answers);

    return res.status(200).send({csv: csv})
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

/**
 * @swagger
 * /u/hacks/:hid/:
 *  delete:
 *    description: Deletes a hackathon registrant
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
 *        description: 'JWT does not have user privileges'
 *      '404':
 *        description: 'Not found'
 */
let deleteRegistrant = async (req, res) => {
    let hid = req.query.hid;

    if (hid === undefined) {
        return res.status(400).send();
    }

    let t = req.headers['ha-api-token'];
    let claims = await JWT.getUIDFromToken(t);
    if (claims.err) {
        res.status(500).send(claims.err)
    }

    let deleteRegistrantRes = await DAL.deleteRegistrant(claims.uid, hid);
    if (deleteRegistrantRes. err) {
        return res.status(deleteRegistrantRes.err).send();
    }

    return res.status(200).send();
};

module.exports = {
    createRegForm,
    updateRegForm,
    deleteRegQuestion,
    getRegQuestions,
    createRegOption,
    updateRegOption,
    deleteRegOption,
    createRegAnswers,
    updateRegAnswer,
    getRegAnswersCSV,
    getUserRegAnswers,
    deleteRegistrant,
};
