const pool = require('./dal-pool');

async function createHackathon(name, startDate, endDate, location, maxReg, regDeadline) {
    try {
        let res = await pool.query('INSERT INTO hackathons (name, start_date, end_date, location, max_reg, reg_deadline) VALUES ($1, $2, $3, $4, $5, $6) RETURNING hid, name, start_date as "startDate", end_date as "endDate", location, max_reg as "maxReg", reg_deadline as "regDeadline", draft',
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
        let res = await pool.query('UPDATE hackathons SET name=$1, start_date=$2, end_date=$3, location=$4, max_reg=$5, reg_deadline=$6 WHERE hid=$7 RETURNING hid, name, start_date as "startDate", end_date as "endDate", location, max_reg as "maxReg", reg_deadline as "regDeadline", draft',
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

async function getHackathonOverview(hid) {
    try {
        let res = await pool.query('SELECT hid, name, start_date as "startDate", end_date as "endDate", location, max_reg as "maxReg", reg_deadline as "regDeadline", draft ' + 
                                    'FROM hackathons WHERE hid=$1',
            [hid]);

        if (res.rowCount === 0) return {hack: null, err: 404};
        else return {hack: res.rows[0], err: null}
    } catch (err) {
        console.error(err);
        return {hack: null, err: 500};
    }
}

async function getHackathonOverviews() {
    try {
        let res = await pool.query('SELECT hid, name, start_date as "startDate", end_date as "endDate", location, max_reg as "maxReg", reg_deadline as "regDeadline", draft ' + 
                                    'FROM hackathons');
            
        return {hacks: res.rows, err: null}
    } catch (err) {
        console.error(err);
        return {hacks: null, err: 500};
    }
}

async function createHackathonDetailsTx(hid, details) {
    const client = await pool.connect()

    try {
        await client.query('BEGIN')
        let resList = [];

        for (d in details) {
            if (details[d].detail === undefined || details[d].index === undefined) {
                await client.query('ROLLBACK')
                return {details: null, err: 400};
            }

            let res = await client.query('INSERT INTO hackathon_details (hid, detail, index) VALUES ($1, $2, $3) RETURNING *',
                [hid, details[d].detail, details[d].index]);
            
            if (res.rowCount === 0) {
                await client.query('ROLLBACK')
                return {hacks: null, err: 404};
            }
            
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

async function updateHackathonDetailsTx(details) {
    const client = await pool.connect()
    let resList = [];

    try {
        await client.query('BEGIN')

        for (d in details) {
            if (details[d].did === undefined || details[d].detail === undefined || details[d].index === undefined) {
                await client.query('ROLLBACK')
                return {details: null, err: 400};
            }
            
            let res = await client.query('UPDATE hackathon_details SET detail=$1, index=$2 WHERE did=$3 RETURNING *',
                [details[d].detail, details[d].index, details[d].did]);

            if (res.rowCount === 0) {
                await client.query('ROLLBACK')
                return {details: null, err: 404};
            }
            else {
                resList.push(res.rows[0]);
            }
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

async function deleteHackathonDetail(did) {
    try {
        let res = await pool.query('DELETE FROM hackathon_details WHERE did=$1',
            [did]);
        if (res.rowCount === 0) return {err: 404};
        return {err: null}
    } catch (err) {
        console.error(err);
        return {err: 500}
    }
}

async function getHackathonDetails(hid) {
    try {
        let res = await pool.query('SELECT * FROM hackathon_details WHERE hid=$1',
            [hid]);

        if (res.rowCount === 0) return {details: null, err: 404};
        return {details: res.rows, err: null}
    } catch (err) {
        console.error(err);
        return {err: 500}
    }
}

async function publishHackathon(hid) {
    try {
        let res = await pool.query('UPDATE hackathons SET draft = NOT draft WHERE hid = $1',
            [hid]);

        if (res.rowCount === 0) return {hack: null, err: 404};
        return {hacks: res.rows[0], err: null}
    } catch (err) {
        console.error(err);
        return {err: 500}
    }
}

module.exports = {
    createHackathon,
    updateHackathon,
    deleteHackathon,
    getHackathonOverview,
    getHackathonOverviews,
    createHackathonDetailsTx,
    updateHackathonDetailsTx,
    deleteHackathonDetail,
    getHackathonDetails,
    publishHackathon,
};
