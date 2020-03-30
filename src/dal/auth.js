const pool = require('./dal-pool');

async function signUp(firstName, lastName, email, password) {
    try {
        let res = await pool.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING uid, first_name as "firstName", last_name as "lastName", email, admin',
            [firstName, lastName, email, password]);

        return {user: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {user: null, err: 500}
    }
}

async function signInEmailPassword(email, password) {
    try {
        let res = await pool.query('SELECT uid, first_name as "firstName", last_name as "lastName", email, admin FROM users WHERE email = $1 AND password = $2',
            [email, password]);

        if (res.rowCount === 0) return {user: null, err: 404};
        else return {user: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {user: null, err: 500}
    }
}

module.exports = {
    signUp,
    signInEmailPassword,
};