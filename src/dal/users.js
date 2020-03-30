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

module.exports = {
    getUser,
    deleteUser
};