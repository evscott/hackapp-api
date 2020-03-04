/**
 * @swagger
 * /user/:
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
    
};

module.exports = {
    getUser,
    updateUser,
    deleteUser
};