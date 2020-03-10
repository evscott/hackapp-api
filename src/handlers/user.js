const DAL = require("../dal/users");
const JWT = require("../shared/jwt");

/**
 * @swagger
 * /users/:uid/:
 *  get:
 *    description: Use to request a user
 *    parameters:
 *      - name: ha-user-token
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
 */
let getUser = async (req, res) => {
    let token = req.headers['ha-user-token'];
    let getUIDRes = await JWT.getUIDFromToken(token);
    if (getUIDRes.err) {
        res.status(500).send();
    }

    let getUser = await DAL.getUser(getUIDRes.uid);
    if (getUser.err) {
        return res.status(getUser.err).send();
    }

    return res.status(200).send({
        user: getUser.user
    });
};

/**
 * @swagger
 * /user/:uid/:
 *  put:
 *    description: Use to update a user
 *    parameters:
 *      - name: ha-user-token
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
let updateUser = async (req, res) => {
    
};

/**
 * @swagger
 * /user/:uid/:
 *  delete:
 *    description: Use to delete a user
 *    parameters:
 *      - name: ha-user-token
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
    let token = req.headers['ha-user-token'];
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