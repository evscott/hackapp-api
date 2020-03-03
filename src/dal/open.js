const { Pool } = require('pg');
const pool = new Pool();

pool.on('error', err => {
    console.error('Unexpected error on idle client', err);
});

async function signInEmailPassword(email, password) {
    try {
        let res = await pool.query('SELECT uid, email, first_name, last_name, admin FROM users WHERE email = $1 AND password = $2',
            [email, password]);

        if (res == undefined) return {user: null, err: 404};
        else return {user: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {user: null, err: 500}
    }
}

module.exports = {
    signInEmailPassword,
};