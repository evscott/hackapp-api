const pool = require('./dal-pool');

async function getHackathon(hid) {
    try {
        let res = await pool.query('SELECT * FROM hackathons WHERE hid=$1',
            [hid]);

        if (res.rowCount === 0) return {hack: null, err: 404};
        else return {hack: res.rows[0], err: null}
    } catch (err) {
        console.error(err);
        return {hack: null, err: 500};
    }
}

async function getHackathons() {
    try {
        let res = await pool.query('SELECT * FROM hackathons');
        if (res.rowCount === 0) return {hacks: null, err: 404};
        else return {hacks: res.rows, err: null}
    } catch (err) {
        console.error(err);
        return {hacks: null, err: 500};
    }
}

async function createHackathon(name, startDate, endDate, location, maxReg, regDeadline) {
    try {
        let res = await pool.query('INSERT INTO hackathons (name, start_date, end_date, location, max_reg, regDeadline) VALUES ($1, $2, $3, $4, $5, $6) RETURNING hid, name, start_date, end_date, location, max_reg, regDeadline',
            [name, startDate, endDate, location, maxReg, regDeadline]);

        if (res === undefined) {
            return {hack: null, err: 400};
        }
        else {
            return {hack: res.rows[0], err: null}
        }
    } catch (err) {
        console.error(err);
        return {hack: null, err: 500}
    }
}

async function deleteHackathon(hid) {
    try {
        let res = await pool.query('DELETE FROM hackathons WHERE hid=$1',
            [hid]);

        if (res.rowCount === 0) return {err: 404};
        else return {err: null}
    } catch (err) {
        console.error(err);
        return {err: 500};
    }
}

module.exports = {
    getHackathon,
    getHackathons,
    createHackathon,
    deleteHackathon
};