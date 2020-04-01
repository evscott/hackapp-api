const pool = require('./dal-pool');

async function createRegQuestionTx(hid, question, descr, required, index, type, options) {
    const client = await pool.connect()

    try {
        await client.query('BEGIN')
        let res = await client.query('INSERT INTO reg_questions(hid, question, descr, required, index, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [hid, question, descr, required, index, type]);

        if (res.rowCount[0] === 0) {
            await client.query('ROLLBACK')
            return {question: null, options: null, err: 400}
        }

        await client.query('COMMIT')
        await client.query('BEGIN')

        let regQuestion = res.rows[0];
        let resList = [];

        for (o in options) {
            res = await client.query('INSERT INTO reg_options(qid, option, index) VALUES ($1, $2, $3) RETURNING *',
            [regQuestion.qid, options[o], o]);

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

async function updateRegQuestionTx(qid, question, descr, required, index, type, options) {
    const client = await pool.connect()

    try {
        await client.query('BEGIN')
        let res = await client.query('UPDATE reg_questions SET question = $2, descr = $3, required = $4, index = $5, type = $6 WHERE qid = $1 RETURNING *',
            [qid, question, descr, required, index, type]);

        if (res.rowCount[0] === 0) {
            await client.query('ROLLBACK')
            return {question: null, options: null, err: 400}
        }
        
        let regQuestion = res.rows[0];
        let resList = [];

        for (o in options) {
            res = await client.query('UPDATE reg_options SET option = $1, index = $2 WHERE qid = $3 RETURNING *',
            [options[o].option, options[o].index, qid]);

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

async function deleteRegQuestion(qid) {
    try {
        let res = await pool.query('DELETE FROM reg_questions WHERE qid = $1',
            [qid]);

        if (res.rowCount[0] === 0) return {err: 404};
        else return {err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

async function getRegQuestions(hid) {
    try {
        let res = await pool.query('SELECT * FROM reg_questions WHERE hid = $1',
            [hid]);

        if (res.rowCount[0] === 0) return {err: 404};
        else return {questions: res.rows, err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

async function createRegOption(qid, option, index) {
    try {
        let res = await pool.query('INSERT INTO reg_options(qid, option, index) VALUES ($1, $2, $3) RETURNING *',
            [qid, option]);

        if (res.rowCount[0] === 0) return {err: 400};
        else return {option: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

async function updateRegOption(oid, index, option) {
    try {
        let res = await pool.query('UPDATE reg_options SET option = $1, index = $2 WHERE oid = $3 RETURNING *',
            [option, index, oid]);

        if (res.rowCount[0] === 0) return {err: 404};
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

        if (res.rowCount[0] === 0) return {err: 404};
        else return {err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

async function getRegOptions(qid) {
    try {
        console.log('gettingReg for', qid);
        let res = await pool.query('SELECT * reg_options WHERE qid = $1',
            [qid]);

        return {option: res.rows, err: null}
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

async function updateRegAnswer(aid, uid, oid, answer) {
    try {
        let res;

        if (oid)
            res = await pool.query('UPDATE reg_answers SET option = $1 WHERE aid = $2 AND uid = $3 RETURNING *',
                [oid, aid, uid]);
        else
            res = await pool.query('UPDATE reg_answers SET answer = $1 WHERE aid = $2 ND uid = $3 RETURNING *',
                [answer, aid, uid]);
        
        if (res.rowCount[0] === 0) return {answer: null, err: 404};
        else return {answer: res.rows[0], err: null}
    } catch (err) {
        console.error(err)
        return {answer: null, err: 500}
    }
}

async function getRegAnswers(hid) {
    try {
        let res = await pool.query('SELECT question, COALESCE(o.option, a.answer) as answer, a.uid ' +
                                   'FROM reg_questions AS q JOIN reg_answers AS a ON q.qid = a.qid FULL JOIN reg_options as o ON o.oid = a.oid ' +
                                   'WHERE a.oid IS NOT NULL OR a.answer IS NOT NULL AND q.hid = $1',
            [hid]);

        return {answers: res.rows, err: null}
    } catch (err) {
        console.error(err)
        return {answers: null, err: 500}
    }
}

async function getUserRegAnswers(hid, uid) {
    try {
        let res = await pool.query('SELECT question, COALESCE(o.option, a.answer) as answer ' +
                                   'FROM reg_questions AS q JOIN reg_answers AS a ON q.qid = a.qid FULL JOIN reg_options as o ON o.oid = a.oid ' +
                                   'WHERE a.oid IS NOT NULL OR a.answer IS NOT NULL AND q.hid = $1 AND a.uid = $2',
            [hid, uid]);
        
        return {answers: res.rows, err: null}
    } catch (err) {
        console.error(err)
        return {answers: null, err: 500}
    }
}

module.exports = {
    createRegQuestionTx,
    updateRegQuestionTx,
    deleteRegQuestion,
    getRegQuestions,
    createRegOption,
    updateRegOption,
    deleteRegOption,
    getRegOptions,
    createRegAnswer,
    updateRegAnswer,
    getRegAnswers,
    getUserRegAnswers
};