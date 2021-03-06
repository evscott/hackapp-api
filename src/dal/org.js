const pool = require('./dal-pool');

async function getOrganization() {
    try {
        let res = await pool.query('SELECT * FROM organizations');
        if (res.rowCount === 0) return {org: null, err: 404};
        else return {org: res.rows[0], err: null}
    } catch (err) {
        console.error(err);
        return {org: null, err: 500};
    }
}

async function createOrganization(organizationName) {
    try {
        let res = await pool.query('INSERT INTO organizations (name) VALUES ($1) RETURNING name',
            [organizationName]);
        if (res === undefined) return {org: null, err: 400};
        else return {org: res.rows[0], err: null}
    } catch (err) {
        console.error(err);
        return {org: null, err: 500};
    }
}

async function updateOrganization(oldOrganizationName, newOrganizationName) {
    try {
        let res = await pool.query('UPDATE organizations SET name = $1 WHERE name = $2 RETURNING name',
            [newOrganizationName, oldOrganizationName]);
        if (res === undefined) return {org: null, err: 400};
        if (res.rowCount === 0) return {org: null, err: 404};
        return {org: res.rows[0], err: null}
    } catch (err) {
        console.error(err);
        return {org: null, err: 500};
    }
}

module.exports = {
    getOrganization,
    createOrganization,
    updateOrganization
};