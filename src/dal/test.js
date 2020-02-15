const { Pool } = require('pg');
const pool = new Pool();

pool.on('error', err => {
    console.error('Unexpected error on idle client', err);
});

async function testFunction(name) {
    try {
        // let res = await pool.query('SELECT * FROM "Table" WHERE Name = $1', [name]);
        // return {user: res.rows[0], error: null}
        return name
    } catch (err) {
        // return {user: null, error: err};
        return 'error?'
    }
}

module.exports = {
    testFunction,
};