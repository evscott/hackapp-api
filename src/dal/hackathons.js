const { Pool } = require('pg');
const pool = new Pool();

pool.on('error', err => {
    console.error('Unexpected error on idle client', err);
});

async function createHackathon(name, startDate, endDate, location, maxReg) {
    try {
        let res = await pool.query('INSERT INTO hackathons (name, start_date, end_date, location, max_reg) VALUES ($1, $2, $3, $4, $5) RETURNING hid, name, start_date, end_date, location, max_reg',
            [name, startDate, endDate, location, maxReg]);

        if (res === undefined) {
            return {hackathon: null, err: 400};
        }
        else {
            return {hackathon: res.rows[0], err: null}
        }
    } catch (err) {
        console.error(err);
        return {hackathon: null, err: 500}
    }
}

module.exports = {
    createHackathon,
};