const DAL = require('../dal/dal');

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
 *          properties:
 *            hid:
 *              type: string
 *            name:
 *              type: string
 *            startDate:
 *              type: number
 *            endDate:
 *              type: number
 *            location:
 *              type: string
 *            maxReg:
 *              type: number
 *            regDeadline:
 *              type: number
 *    responses:
 *      '201':
 *        description: 'Success'
 *        schema:
 *          type: object
 *          properties:
 *            hack:
 *              type: object
 *              properties:
 *                hid:
 *                  type: string
 *                name:
 *                  type: string
 *                startDate:
 *                  type: number
 *                endDate:
 *                  type: number
 *                location:
 *                  type: string
 *                maxReg:
 *                  type: number
 *                regDeadline:
 *                  type: number
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
        maxReg = req.body.maxReg,
        regDeadline = req.body.regDeadline;

    if (name === undefined || startDate === undefined || endDate === undefined || location === undefined || maxReg === undefined || regDeadline === undefined){
        return res.status(400).send();
    }

    let createHackathonRes = await DAL.createHackathon(name, startDate, endDate, location, maxReg, regDeadline);
    if (createHackathonRes.err) {
        return res.status(createHackathonRes.err).send();
    }

    return res.status(201).send({hack: createHackathonRes.hack})
};

/**
 * @swagger
 * /hacks/:
 *  put:
 *    description: Use to update a hackathons overview
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
 *          properties:
 *            hid:
 *              type: string
 *            name:
 *              type: string
 *            startDate:
 *              type: number
 *            endDate:
 *              type: number
 *            location:
 *              type: string
 *            maxReg:
 *              type: number
 *            regDeadline:
 *              type: number
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: object
 *          properties:
 *            hack:
 *              type: object
 *              properties:
 *                hid:
 *                  type: string
 *                name:
 *                  type: string
 *                startDate:
 *                  type: number
 *                endDate:
 *                  type: number
 *                location:
 *                  type: string
 *                maxReg:
 *                  type: number
 *                regDeadline:
 *                  type: number
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
    let name = req.body.name,
    startDate = req.body.startDate,
    endDate = req.body.endDate,
    location = req.body.location,
    maxReg = req.body.maxReg,
    regDeadline = req.body.regDeadline,
    hid = req.body.hid;

    if (name === undefined || startDate === undefined || endDate === undefined || location === undefined || maxReg === undefined || regDeadline === undefined || hid === undefined){
        return res.status(400).send();
    }

    console.log('gonna update a hackathon', hid)

    let updateHackathonRes = await DAL.updateHackathon(name, startDate, endDate, location, maxReg, regDeadline, hid);
    if (updateHackathonRes.err) {
        return res.status(updateHackathonRes.err).send();
    }

    return res.status(200).send({hack: updateHackathonRes.hack})
};

/**
 * @swagger
 * /hacks/:
 *  delete:
 *    description: Use to delete a hackathon
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
    let hid = req.body.hid;

    if (name === undefined){
        return res.status(400).send();
    }

    let deleteHackathonRes = await DAL.deleteHackathon(hid);
    if (deleteHackathonRes.err) {
        return res.status(deleteHackathonRes.err).send();
    }

    return res.status(200).send()
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
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  hid:
 *                    type: string
 *                  name:
 *                    type: string
 *                  startDate:
 *                    type: number
 *                  endDate:
 *                    type: number
 *                  location:
 *                    type: string
 *                  maxReg:
 *                    type: number
 *                  regDeadline:
 *                    type: number
 */
let getHackathons = async (req, res) => {
    let getHackathonsRes = await DAL.getHackathons();
    if (getHackathonsRes.err) {
        return res.status(getHackathonsRes.err).send();
    }

    return res.status(200).send({hacks: getHackathonsRes.hacks});
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
 *              properties:
 *                hid:
 *                  type: string
 *                name:
 *                  type: string
 *                startDate:
 *                  type: number
 *                endDate:
 *                  type: number
 *                location:
 *                  type: string
 *                maxReg:
 *                  type: number
 *      '400':
 *        description: 'Bad request'
 *      '404':
 *        description: 'Not found'
 */
let getHackathon = async (req, res) => {
    let hid = req.query.hid;
    if (hid === undefined) {
        return res.status(400).send();
    }

    let getHackathonRes = await DAL.getHackathon(hid);
    if (getHackathonRes.err) {
        return res.status(getHackathonRes.err).send();
    }

    return res.status(200).send({hack: getHackathonRes.hack})
};

/**
 * @swagger
 * /hacks/det/:
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
 *      '201':
 *        description: 'Success'
 *        schema:
 *          type: object
 *          properties:
 *            did:
 *              type: string
 *              format: uuid
 *            hid:
 *              type: string
 *              format: uuid
 *            detail:
 *              type: string
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 */
let createHackathonDetails = async (req, res) => {
    let hid = req.body.hid,
        detail = req.body.detail;

    if (hid === undefined || detail === undefined){
        return res.status(400).send();
    }

    let createHackathonDetailRes = await DAL.createHackathonDetailsTx(hid, detail);
    if (createHackathonDetailRes.err) {
        return res.status(createHackathonDetailRes.err).send();
    }

    return res.status(201).send({detail: createHackathonDetailRes.detail})
};

/**
 * @swagger
 * /hacks/det/:
 *  put:
 *    description: Use to update a hackathon detail
 *    parameters:
 *      - name: ha-api-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: did
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: detail
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: 'Success'
 *        schema:
 *          type: object
 *          properties:
 *            did:
 *              type: string
 *              format: uuid
 *            hid:
 *              type: string
 *              format: uuid
 *            detail:
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
let updateHackathonDetail = async (req, res) => {
    let did = req.body.did,
        detail = req.body.detail;

    if (did === undefined || detail === undefined){
        return res.status(400).send();
    }

    let updateHackathonDetailRes = await DAL.updateHackathonDetail(did, detail);
    if (updateHackathonDetailRes.err) {
        return res.status(updateHackathonDetailRes.err).send();
    }

    return res.status(200).send({detail: updateHackathonDetailRes.detail})
};

/**
 * @swagger
 * /hacks/det/:
 *  delete:
 *    description: Use to update a hackathon detail
 *    parameters:
 *      - name: ha-api-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: did
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *    responses:
 *      '200':
 *        description: 'Success'
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 *      '404':
 *        description: 'Not found'
 */
let deleteHackathonDetail = async (req, res) => {
    let did = req.body.did;

    if (did === undefined){
        return res.status(400).send();
    }

    let deleteHackathonDetailRes = await DAL.deleteHackathonDetail(did);
    if (deleteHackathonDetailRes.err) {
        return res.status(deleteHackathonDetailRes.err).send();
    }

    return res.status(200).send()
};


/**
 * @swagger
 * /hacks/det/:hid/:
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
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  did:
 *                    type: string
 *                    format: uuidw
 *                  hid:
 *                    type: string
 *                    format: uuid
 *                  detail:
 *                    type: string
 *      '400':
 *        description: 'Bad request'
 *      '404':
 *        description: 'Not found'
 */
let getHackathonDetails = async (req, res) => {
    let hid = req.body.did;

    if (hid === undefined){
        return res.status(400).send();
    }

    let getHackathonDetailsRes = await DAL.getHackathonDetails(hid);
    if (getHackathonDetailsRes.err) {
        return res.status(getHackathonDetailsRes.err).send();
    }

    return res.status(200).send({details: getHackathonDetailsRes.details})
};

module.exports = {
    createHackathon,
    updateHackathon,
    deleteHackathon,
    getHackathons,
    getHackathon,
    createHackathonDetails,
    updateHackathonDetail,
    deleteHackathonDetail,
    getHackathonDetails,
};