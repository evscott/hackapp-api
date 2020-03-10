const DAL = require('../dal/dal');
const JWT = require('../shared/jwt');

/**
 * @swagger
 * /org/:
 *  get:
 *    description: Use to request organization - Note: There should only be *one* organization in Hackapp v0.0.1
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
    let getOrgRes = await DAL.getOrganization(name);
    if (getOrgRes.err) {
        return res.status(getOrgRes.err).send();
    }

    return res.status(201).send({org: getOrgRes.org})
};

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


module.exports = {
    getOrganization,
    createOrganization,
    updateOrganization,
};