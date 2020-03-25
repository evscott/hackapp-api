const pool = require('./dal-pool');

async function createHackathon(name, startDate, endDate, location, maxReg, regDeadline) {
    try {
        let res = await pool.query('INSERT INTO hackathons (name, start_date, end_date, location, max_reg, regDeadline) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
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

async function updateHackathon(name, startDate, endDate, location, maxReg, regDeadline, hid) {
    try {
        let res = await pool.query('UPDATE hackathons set name=$1, startDate=$2, endDate=$3, location=$4, maxReg=$5, regDeadline=$6 WHERE hid=$7 RETURNING *',
            [name, startDate, endDate, location, maxReg, regDeadline, hid]);

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

async function createHackathonDetails(hid, details) {
    const client = await pool.connect()

    try {
        await client.query('BEGIN')
        let resList = [];

        for (d in details) {
            let res = await client.query('INSERT INTO hackathon_details (hid, detail) VALUES ($1, $2) RETURNING *',
                [hid, d]);
            if (res.rowCount === 0) return {hacks: null, err: 404};
            resList.push(res.rows[0]);
        }
        
        await client.query('COMMIT')
        return {details: resList, err: null}
    } catch (err) {
        console.error(err);
        await client.query('ROLLBACK')
        return {details: null, err: 500};
    } finally {
        client.release()
    }
}

async function updateHackathonDetail(did, detail) {
    let res = await pool.query('UPDATE hackathon_details SET detail=$1 WHERE did=$2 RETURNING *',
        [did, detail]);
    if (res.rowCount === 0) return {hacks: null, err: 404};
    return {detail: res.rows[0], err: null}
}

async function deleteHackathonDetail(did) {
    let res = await pool.query('SELET * FROM hackathon_details WHERE did=$1',
        [did]);
    if (res.rows === 0) return {err: 404};
    return {err: null}
}

async function getHackathonDetails(hid) {
    let res = await pool.query('SELET * FROM hackathon_details WHERE hid=$1',
        [hid]);
    if (res.rows === 0) return {hacks: null, err: 404};
    return {details: res.rows, err: null}
}

module.exports = {
    createHackathon,
    updateHackathon,
    deleteHackathon,
    getHackathon,
    getHackathons,
    createHackathonDetails,
    updateHackathonDetail,
    deleteHackathonDetail,
    getHackathonDetails,
};