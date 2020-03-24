const pool = require('./dal-pool');

async function createRegQuestionTx(hid, question, options) {
    const client = await pool.connect()

    try {
        await client.query('BEGIN')

        let res = await client.query('INSERT INTO reg_questions(hid, question) VALUES ($1, $2) RETURNING qid, hid, question',
            [hid, question]);

        if (res.rowCount[0] === 0) {
            await client.query('ROLLBACK')
            return {question: null, options: null, err: 400}
        }

        await client.query('COMMIT')

        let qid = res.rows[0].qid;
        let resList = [];

        for (o in options) {
            res = await client.query('INSERT INTO reg_options(qid, option) VALUES ($1, $2) RETURNING oid, qid, option',
            [qid, o]);

            if (res.rowCount[0] === 0) {
                await client.query('ROLLBACK')
                return { question: null, options: null, err: 400 };
            }

            await client.query('ROLLBACK')
            resList.push(res.rows[0])
        }

        await client.query('COMMIT')
        return {question: res.rows[0], options: resList, err: null}
    } catch (err) {
        console.error(err)
        await client.query('ROLLBACK')
        return {question: null, options: null, err: 500}
    } finally {
        client.release()
    }
}

async function updateRegQuestion(qid, question) {
    try {
        let res = await pool.query('UPDATE reg_questions SET question = $1 WHERE qid = $2 RETURNING qid, hid, question',
            [question, qid]);

        if (res.rowCount[0] === 0) return {regQuestion: null, err: 400};
        else return {question: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {question: null, err: 500}
    }
}

async function deleteRegQuestion(qid) {
    try {
        let res = await pool.query('DELETE FROM reg_questions WHERE qid = $1',
            [qid]);

        if (res.rowCount[0] === 0) return {err: 400};
        else return {err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

async function createRegQuestionOption(qid, option) {
    try {
        let res = await pool.query('INSERT INTO reg_options(qid, option) VALUES ($1, $2) RETURNING qid, oid, option',
            [qid, option]);

        if (res.rowCount[0] === 0) return {err: 400};
        else return {option: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

async function updateRegQuestionOption(oid, option) {
    try {
        let res = await pool.query('UPDATE reg_options SET option = $1 WHERE oid = $2 RETURNING oid, qid, option',
            [option, oid]);

        if (res.rowCount[0] === 0) return {err: 400};
        else return {option: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

async function deleteRegQuestionOption(oid) {
    try {
        let res = await pool.query('DELETE FROM reg_options WHERE oid = $1',
            [oid]);

        if (res.rowCount[0] === 0) return {err: 400};
        else return {err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

module.exports = {
    createRegQuestionTx,
    updateRegQuestion,
    deleteRegQuestion,
    createRegQuestionOption,
    updateRegQuestionOption,
    deleteRegQuestionOption
};