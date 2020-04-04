const pool = require('./dal-pool');

async function createRegQuestions(questions) {
    try {

        let questionsCreated = [], optionsCreated = [];

        for (q in questions) {

            let res = await pool.query('SELECT * FROM hackathons WHERE hid = $1',
                [questions[q].hid]);
            if (res.rowCount === 0) {
                return {questions: null, options: null, err: 400}
            }

            res = await pool.query('INSERT INTO reg_questions(hid, question, descr, required, index, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [questions[q].hid, questions[q].question, questions[q].descr, questions[q].required, questions[q].index, questions[q].type]);
            if (res.rowCount === 0) {
                return {questions: null, options: null, err: 400}
            }

            questionsCreated.push(res.rows[0]);
            let regQuestion = res.rows[0];
            let options = questions[q].options;

        
            if (options) {
                for (o in options) {
                    if (options[o].option === undefined || options[o].index === undefined) {
                        return {questions: null, options: null, err: 400};
                    }

                    res = await pool.query('INSERT INTO reg_options(qid, option, index) VALUES ($1, $2, $3) RETURNING *',
                        [regQuestion.qid, options[o].option, options[o].index]);
                    if (res.rowCount === 0) {
                        return {question: null, options: null, err: 400};
                    }

                    optionsCreated.push(res.rows[0]);
                }
            }
        }

        return {questions: questionsCreated, options: optionsCreated, err: null}
    } catch (err) {
        return {questions: null, options: null, err: 500}
    }
}

async function updateRegQuestions(questions) {
    try {
        let resList = [];
        for (q of questions) {
            let res = await pool.query('UPDATE reg_questions SET question = $1, descr = $2, required = $3, index = $4, type = $5 WHERE qid = $6 RETURNING *',
                [q.question, q.descr, q.required, q.index, q.type, q.qid]);

            if (res.rowCount === 0) {
                return {questions: null, err: 400}
            }

            resList.push(res.rows[0])
        }

        return {questions: resList, err: null}
    } catch (err) {
        console.error(err)
        return {questions: null, err: 500}
    }
}

async function deleteRegQuestion(qid) {
    try {
        let res = await pool.query('DELETE FROM reg_questions WHERE qid = $1',
            [qid]);

        if (res.rowCount === 0) return {err: 404};
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
            
        return {questions: res.rows, err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

async function createRegOptions(options) {
    try {
    
        let resList = [];
        for (o of options) {
            let res = await pool.query('INSERT INTO reg_options(qid, option, index) VALUES ($1, $2, $3) RETURNING *',
                [o.qid, o.option, o.index]);

            if (res.rowCount === 0) return {err: 400};
            resList.push(res.rows[0]);
        }

        return {options: resList, err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

async function updateRegOptions(options) {
    try {

        let updatedOptions = [];
        for (o of options) {

            let res = await pool.query('UPDATE reg_options SET option = $1, index = $2 WHERE oid = $3 RETURNING *',
                [o.option, o.index, o.oid]);

            if (res.rowCount === 0) {
                return {err: 404};
            }
            updatedOptions.push(res.rows[0]);
        }

        return {options: updatedOptions, err: null}
    } catch (err) {
        console.error(err);
        return {err: 500}
    }
}

async function updateRegOption(oid, index, option) {
    try {
        let res = await pool.query('UPDATE reg_options SET option = $1, index = $2 WHERE oid = $3 RETURNING *',
            [option, index, oid]);

        if (res.rowCount === 0) return {err: 404};
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

        if (res.rowCount === 0) return {err: 404};
        else return {err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    }
}

async function getRegOptions(qid) {
    try {
        let res = await pool.query('SELECT * FROM reg_options WHERE qid = $1',
            [qid]);

        return {options: res.rows, err: null}
    } catch (err) {
        console.error(err)
        return {err: 500}
    } 
}

async function createRegAnswers(uid, answers) {
    try {
        let resList = [];
        for (a in answers) {
            if (answers[a].qid === undefined || answers[a].oid === undefined && answers[a].answer === undefined) {
                return {answers: null, err: 400}
            }

            let res = await pool.query('SELECT * FROM reg_questions WHERE qid = $1',
            [answers[a].qid]);

            if (res.rowCount === 0) {
                return {answers: null, err: 400}
            }
    
            if (answers.oid) {
                res = await pool.query('SELECT * FROM reg_options WHERE oid = $1',
                    [answers[a].oid]);

                if (res.rowCount > 0)
                    res = await pool.query('INSERT INTO reg_answers(qid, uid, oid) VALUES ($1, $2, $3) RETURNING *',
                    [answers[a].qid, uid, answers[a].oid]);
            }
            else
                res = await pool.query('INSERT INTO reg_answers(qid, uid, answer) VALUES ($1, $2, $3) RETURNING *',
                    [answers[a].qid, uid, answers[a].answer]);

            if (res.rowCount === 0) {
                return {answers: null, err: 400}
            }

            resList.push(res.rows[0]);
        }
        
        return {answers: resList, err: null}
    } catch (err) {
        console.error(err)
        return {answers: null, err: 500}
    }
}

async function updateRegAnswer(uid, answers) {
    try {
        let resList = [];
        for (a in answers) {
            if (answers[a].aid === undefined || answers[a].oid === undefined && answers[a].answer === undefined) {
                return {answers: null, err: 400}
            }

            let res = await pool.query('SELECT * FROM reg_questions WHERE qid = $1',
            [answers[a].qid]);

            if (res.rowCount === 0) {
                return {answers: null, err: 400}
            }
    
            res = await pool.query('UPDATE reg_answers SET oid = $1, answer = $1 WHERE aid = $2 AND uid = $3 RETURNING *',
                    [answers[a].oid, answers[a].aid, uid]);  

            if (res.rowCount === 0) {
                return {answers: null, err: 400}
            }

            resList.push(res.rows[0]);
        }
        
        return {answers: resList, err: null}
    } catch (err) {
        console.error(err)
        return {answers: null, err: 500}
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
    createRegQuestions,
    updateRegQuestions,
    deleteRegQuestion,
    getRegQuestions,
    createRegOptions,
    updateRegOption,
    updateRegOptions,
    deleteRegOption,
    getRegOptions,
    createRegAnswers,
    updateRegAnswer,
    getRegAnswers,
    getUserRegAnswers
};
