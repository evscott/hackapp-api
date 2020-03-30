const DAL = require('../dal/dal');

/**
 * @swagger
 * /a/hacks/ov/:
 *  post:
 *    description: Use to create a hackathon overview
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
 *                draft:
 *                  type: boolean
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 *      '500':
 *        description: 'Internal server error'
 */
let createHackathonOverview = async (req, res) => {
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

    return res.status(201).send(createHackathonRes.hack)
};

/**
 * @swagger
 * /a/hacks/ov/:
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
 *                draft:
 *                  type: boolean
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 *      '404':
 *        description: 'Not found'
 */
let updateHackathonOverview = async (req, res) => {
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

    return res.status(200).send(updateHackathonRes.hack)
};

/**
 * @swagger
 * /a/hacks/:
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
 *        in: path
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
    let hid = req.query.hid;
    
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
 * /hacks/ov/:
 *  get:
 *    description: Use to request all hackathon overviews
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
 *                  draft:
 *                    type: boolean
 */
let getHackathonOverviews = async (req, res) => {
    let getHackathonsRes = await DAL.getHackathonOverviews();
    if (getHackathonsRes.err) {
        return res.status(getHackathonsRes.err).send();
    }

    return res.status(200).send(getHackathonsRes.hacks);
};

/**
 * @swagger
 * /hacks/ov/:hid/:
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
 *                regDeadline:
 *                  type: number
 *                draft:
 *                  type: boolean
 *      '400':
 *        description: 'Bad request'
 *      '404':
 *        description: 'Not found'
 */
let getHackathonOverview = async (req, res) => {
    let hid = req.query.hid;
    if (hid === undefined) {
        return res.status(400).send();
    }

    let getHackathonRes = await DAL.getHackathonOverview(hid);
    if (getHackathonRes.err) {
        return res.status(getHackathonRes.err).send();
    }

    return res.status(200).send(getHackathonRes.hac)
};

/**
 * @swagger
 * /a/hacks/det/:
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
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              hid:
 *                type: string
 *                format: uuid
 *              detail:
 *                type: string
 *    responses:
 *      '201':
 *        description: 'Success'
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              did:
 *                type: string
 *                format: uuid
 *              hid:
 *                type: string
 *                format: uuid
 *              detail:
 *                type: string
 *              index:
 *                type: number
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 */
let createHackathonDetails = async (req, res) => {
    let hid = req.body.hid,
        details = req.body.details;

    if (hid === undefined || details === undefined){
        return res.status(400).send();
    }

    let createHackathonDetailRes = await DAL.createHackathonDetailsTx(hid, details);
    if (createHackathonDetailRes.err) {
        return res.status(createHackathonDetailRes.err).send();
    }

    return res.status(201).send(createHackathonDetailRes.detail)
};

/**
 * @swagger
 * /a/hacks/det/:
 *  put:
 *    description: Use to update a hackathon detail
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
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              did:
 *                type: string
 *                format: uuid
 *              detail:
 *                type: string
 *              index:
 *                type: number
 *    responses:
 *      '200':
 *        description: 'Success'
 *        schema:
 *          type: array
 *          properties:
 *            did:
 *              type: string
 *              format: uuid
 *            hid:
 *              type: string
 *              format: uuid
 *            detail:
 *              type: string
 *            index:
 *              type: number
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
    let details = req.body.details;

    if (detail === undefined){
        return res.status(400).send();
    }

    let updateHackathonDetailRes = await DAL.updateHackathonDetailTx(details);
    if (updateHackathonDetailRes.err) {
        return res.status(updateHackathonDetailRes.err).send();
    }

    return res.status(200).send(updateHackathonDetailRes.detail)
};

/**
 * @swagger
 * /a/hacks/det/:did/:
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
 *        in: path
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
    let did = req.query.did;
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
 *                    format: uuid
 *                  hid:
 *                    type: string
 *                    format: uuid
 *                  detail:
 *                    type: string
 *                  index:
 *                    type: number
 *      '400':
 *        description: 'Bad request'
 *      '404':
 *        description: 'Not found'
 */
let getHackathonDetails = async (req, res) => {
    let hid = req.body.hid;
    
    if (hid === undefined){
        return res.status(400).send();
    }

    let getHackathonDetailsRes = await DAL.getHackathonDetails(hid);
    if (getHackathonDetailsRes.err) {
        return res.status(getHackathonDetailsRes.err).send();
    }

    return res.status(200).send(getHackathonDetailsRes.details)
};

/**
 * @swagger
 * /a/hacks/pub/:
 *  put:
 *    description: Use to publish (or publish) a hackathon
 *    parameters:
 *      - name: hid
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
 *                regDeadline:
 *                  type: number
 *                draft:
 *                  type: boolean
 *      '400':
 *        description: 'Bad request'
 *      '401':
 *        description: 'JWT not found in header'
 *      '403':
 *        description: 'JWT does not have admin privileges'
 *      '404':
 *        description: 'Not found'
 */
let publishHackathon = async (req, res) => {
    let hid = req.body.hid;
    
    if (hid === undefined){
        return res.status(400).send();
    }

    let publishHackathonRes = await DAL.publishHackathon(hid);
    if (publishHackathonRes.err) {
        return res.status(publishHackathonRes.err).send();
    }

    return res.status(200).send(publishHackathonRes.hack)
};

module.exports = {
    createHackathonOverview,
    updateHackathonOverview,
    deleteHackathon,
    getHackathonOverviews,
    getHackathonOverview,
    createHackathonDetails,
    updateHackathonDetail,
    deleteHackathonDetail,
    getHackathonDetails,
    publishHackathon
};