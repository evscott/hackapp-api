/**
 * @swagger
 * /user:
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
 */
let getUser = async (req, res) => {
    
};

/**
 * @swagger
 * /user:
 *  put:
 *    description: Use to update a user
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
 */
let updateUser = async (req, res) => {
    
};

/**
 * @swagger
 * /user:
 *  delete:
 *    description: Use to delete a user
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
 */
let deleteUser = async (req, res) => {
    
};

/**
 * @swagger
 * /hacks/:hid/reg/users/csv:
 *  get:
 *    description: Use to delete a user
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
 */
let getUserRegForm = async (req, res) => {
    
};

module.exports = {
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserRegForm: getUserRegForm,
};