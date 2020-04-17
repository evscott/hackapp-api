const DAL = require("../dal/users");
const JWT = require("../shared/jwt");

/**
 * @swagger
 * /u/users/:
 *  get:
 *    description: Use to request a user
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
 *        schema:
 *          type: object
 *          properties:
 *            user:
 *              type: object
 *              properties:
 *                uid:
 *                  type: string
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                email:
 *                  type: string
 */
let getUser = async (req, res) => {
    let token = req.headers['ha-api-token'];
    let getUIDRes = await JWT.getUIDFromToken(token);
    if (getUIDRes.err) {
        res.status(500).send();
    }

    let getUser = await DAL.getUser(getUIDRes.uid);
    if (getUser.err) {
        return res.status(getUser.err).send();
    }

    return res.status(200).send(getUser.user);
};

/**
 * @swagger
 * /u/users/:
 *  put:
 *    description: Use to update a user
 *    parameters:
 *      - name: ha-api-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: firstName
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: lastName
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: email
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: password
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
 *        description: 'JWT does not have user privileges'
 *      '404':
 *        description: 'Not found'
 */
let updateUser = async (req, res) => {
    let firstName = req.body.firstName,
        lastName = req.body.lastName,
        email = req.body.email,
        password = req.body.password;

    if (firstName === undefined || lastName === undefined || email === undefined || password === undefined) {
        return res.status(400).send();
    }

    let token = req.headers['ha-api-token'];
    let claims = await JWT.getUIDFromToken(token);
    if (claims.err) {
        res.status(500).send();
    }
    let uid = claims.uid;

    let updateUserRes = await DAL.updateUser(firstName, lastName, email, password, uid);
    if (updateUserRes.err) {
        return res.status(updateUserRes.err).send();
    }

    return res.status(200).send(updateUserRes.user);
};

/**
 * @swagger
 * /u/users/:
 *  delete:
 *    description: Use to delete a user
 *    parameters:
 *      - name: ha-api-token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      - name: uid
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
 *        description: 'JWT does not have user privileges'
 *      '404':
 *        description: 'Not found'
 */
let deleteUser = async (req, res) => {
    let token = req.headers['ha-api-token'];
    let getUIDRes = await JWT.getUIDFromToken(token);
    if (getUIDRes.err) {
        res.status(500).send();
    }

    let deleteUserRes = await DAL.deleteUser(getUIDRes.uid);
    if (deleteUserRes.err) {
        return res.status(deleteUserRes.err).send();
    }

    return res.status(200).send();
};

module.exports = {
    getUser,
    updateUser,
    deleteUser
};
