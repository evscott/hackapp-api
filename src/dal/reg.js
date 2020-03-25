const pool = require('./dal-pool');

async function createRegQuestionTx(hid, question, options) {
    const client = await pool.connect()

    try {
        await client.query('BEGIN')

        let res = await client.query('INSERT INTO reg_questions(hid, question) VALUES ($1, $2) RETURNING *',
            [hid, question]);

        if (res.rowCount[0] === 0) {
            await client.query('ROLLBACK')
            return {question: null, options: null, err: 400}
        }

        await client.query('COMMIT')

        let regQuestion = res.rows[0];
        let resList = [];

        for (o in options) {
            res = await client.query('INSERT INTO reg_options(qid, option) VALUES ($1, $2) RETURNING *',
            [regQuestion.qid, o]);

            if (res.rowCount[0] === 0) {
                await client.query('ROLLBACK')
                return { question: null, options: null, err: 400 };
            }

            await client.query('ROLLBACK')
            resList.push(res.rows[0])
        }

        await client.query('COMMIT')
        return {question: regQuestion, options: resList, err: null}
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
        let res = await pool.query('UPDATE reg_questions SET question = $1 WHERE qid = $2 RETURNING *',
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

async function createRegOption(qid, option) {
    try {
        let res = await pool.query('INSERT INTO reg_options(qid, option) VALUES ($1, $2) RETURNING *',
            [qid, option]);

        if (res.rowCount[0] === 0) return {err: 400};
        else return {option: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

async function updateRegOption(oid, option) {
    try {
        let res = await pool.query('UPDATE reg_options SET option = $1 WHERE oid = $2 RETURNING *',
            [option, oid]);

        if (res.rowCount[0] === 0) return {err: 400};
        else return {option: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

async function deleteRegOption(oid) {
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

async function createRegAnswer(qid, uid, oid, answer) {
    try {

        if (oid)
            res = await pool.query('INSERT INTO reg_answers(qid, uid, oid) VALUES ($1, $2, $3) RETURNING *',
                [qid, uid, oid]);
        else
            res = await pool.query('INSERT INTO reg_answers(qid, uid, answer) VALUES ($1, $2, $3) RETURNING *',
                [qid, uid, answer]);
        
        if (res.rowCount[0] === 0) return {answer: null, err: 400};
        else return {answer: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {answer: null, err: 500}
    }
}

async function updateRegAnswer(aid, oid, answer) {
    try {
        let res;

        if (oid)
            res = await pool.query('UPDATE reg_answers SET option = $1 WHERE aid = $2 RETURNING *',
                [oid, aid]);
        else
            res = await pool.query('UPDATE reg_answers SET answer = $1 WHERE aid = $2 RETURNING *',
                [answer, aid]);
        
        if (res.rowCount[0] === 0) return {answer: null, err: 400};
        else return {answer: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {answer: null, err: 500}
    }
}

module.exports = {
    createRegQuestionTx,
    updateRegQuestion,
    deleteRegQuestion,
    createRegOption,
    updateRegOption,
    deleteRegOption,
    createRegAnswer,
    updateRegAnswer
};