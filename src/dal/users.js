const pool = require('./dal-pool');

async function getUser(uid) {
    try {
        let res = await pool.query('SELECT uid, first_name as "firstName", last_name as "lastName", email, admin FROM users WHERE uid=$1',
            [uid]);

        if (res.rowCount === 0) return {user: null, err: 404};
        else return {user: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {user: null, err: 500}
    }
}

async function deleteUser(uid) {
    try {
        let res = await pool.query('DELETE FROM users WHERE uid=$1',
            [uid]);

        if (res.rowCount === 404) return {err: 404};
        else return {err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

async function updateUser(firstName, lastName, email, password, user) {
    try {
        let res = await pool.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE uid = $5 RETURNING uid, first_name as "firstName", last_name as "lastName", email, admin',
            [firstName, lastName, email, password, uid]);

        if (res.rowCount === 0) return {user: null, err: 404};
        else return {user: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {user: null, err: 500}
    }
}

module.exports = {
    getUser,
    deleteUser,
    updateUser
};