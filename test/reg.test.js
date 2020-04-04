const app = require('../src/index.js');
const chai = require("chai");
const { before, describe, it } = require('mocha');
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);

describe('registration', function() {
    let token, userToken, hid, badHid = '8f717842-62e1-11ea-9ba6-0242ac190002', qid = [], oid = [], expiredToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmYjk3ZjE1YS03MzVjLTExZWEtYTQ0Yi0wMjQyYWMxMjAwMDIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTg1NjY1NDM3LCJleHAiOjE1ODU3MDg2Mzd9.JGc0c5MnI31S7NcuyPiSII2J1yJMXGdV6ohHrhbrIr6KmLycf5DsVOW6INaio6uXLCeBiLGTWKZf2D2IVPAuS98eBm0hNJYT7mC8KSn6YK41yDDeUtkt6LaFfF6KQJs5N3t9TTLlg9ANJmpyELDjWch7s3_3RDEEcATiraw1Rd3Hw58Acw-nyAjHd4d7waY7Ci6pTHd13gUpShdT-WMCz57--drzsVDQ7EamhCkEdVfb_e4x0DmqOHTJLkOAfLnNpSBnpnkVuFkluNjad5J9izWe2ofqTvlUwVjDTs3-_EyaqLIyqZ5JqYba8_J4Pc1ZCFsRLIqIyWQKoumn40L9i9Katou7nN-X3DU_hsd5Jxvy4u2TY3HC8MvBrk0XbHw_BJIZOhFSHVF_0u6PG9RH4j81jqFqluQYdVQ5621mJue2tc1bVsO-pgXEmRIJxhyLI_8VzEsCdJbpzdsBsszwfyOgrwUCeGO2ScSvEVuoUpvG4FelZl9RtUB8WMb8DtsNDYWL8oo91lUrEtq8PoQUY0YITuikI9dTz48jLcv6XstdKvcT3r1OAHe86-WS0V46eQykl45wOS3h0favyBasD6RmgujsR1ZMCvOEWC4k0kxVAR_tTawH92dDX9TlAAm0BCz_X2NJVWOZ0v5ul9AULZJung-prBV0XZ5NU_9W4rg';

    before('logging in to get admin api token should succeed', function(done) {
        chai.request(app)
            .put('/auth')
            .send('email=admin')
            .send('password=admin')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.token.length).greaterThan(0);
                token = res.body.token;
                done();
            })
    });

    before('signing up to get user api token should succeed', function(done) {
        chai.request(app)
            .post('/auth')
            .send('firstName=user')
            .send('lastName=user')
            .send('email=user')
            .send('password=user')
            .set('Accept', 'application/json')
            .set('ha-api-token', token)
            .end((err, res) => {
                expect(res).to.have.status(201)
                expect(res.body.token.length).greaterThan(0);
                userToken = res.body.token;
                done();
            });
    });

    before('creating hackathon to get hid should succeed', function(done) {
        chai.request(app)
            .post('/a/hacks')
            .send('name=MtaHacks')
            .send('startDate=1999-01-08 04:05:06')
            .send('endDate=1999-01-09 04:05:06')
            .send('location=MtA')
            .send('maxReg=100')
            .send('regDeadline=1999-01-09 04:05:06')
            .set('Accept', 'application/json')
            .set('ha-api-token', token)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.hid).lengthOf(36);
                hid = res.body.hid;
                done();
            })
    });

    before('creating registration questions with options to be updated should succeed', function(done) {
        let questions = [
            {
                hid: hid,
                question: 'question one',
                descr: 'description one',
                required: false,
                index: 0,
                type: 'type on',
                options: [
                    {
                        option: "q1, option one",
                        index: 0
                    },
                    {
                        option: "q1, option two",
                        index: 1
                    },
                    {
                        option: "q1, option three",
                        index: 2
                    }
                ]
            },
            {
                hid: hid,
                question: 'question two',
                descr: 'description two',
                required: false,
                index: 1,
                type: 'type on'
            },
            {
                hid: hid,
                question: 'question three',
                descr: 'description three',
                required: false,
                index: 2,
                type: 'type on',
            },
        ];

        chai.request(app)
            .post('/a/hacks/reg/')
            .send({
                questions: questions
            })
            .set('Accept', 'application/json')
            .set('ha-api-token', token)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.questionsCreated[0].hid).equal(hid);
                expect(res.body.questionsCreated[1].hid).equal(hid);
                expect(res.body.questionsCreated[2].hid).equal(hid);

                qid[0] = res.body.questionsCreated[0].qid;
                qid[1] = res.body.questionsCreated[1].qid;
                qid[2] = res.body.questionsCreated[2].qid;

                oid[0] = res.body.optionsCreated[0].oid;
                oid[1] = res.body.optionsCreated[1].oid;
                oid[2] = res.body.optionsCreated[2].oid;

                done();
            });
    });

    describe('reg questions', function() {
        describe('POST /a/hacks/reg', function() {
            it('creating registration questions without options should succeed', function(done) {
                let questions = [
                    {
                        hid: hid,
                        question: 'question one',
                        descr: 'description one',
                        required: false,
                        index: 0,
                        type: 'type on'
                    },
                    {
                        hid: hid,
                        question: 'question two',
                        descr: 'description two',
                        required: false,
                        index: 1,
                        type: 'type on'
                    },
                    {
                        hid: hid,
                        question: 'question three',
                        descr: 'description three',
                        required: false,
                        index: 2,
                        type: 'type on'
                    },
                ];

                chai.request(app)
                    .post('/a/hacks/reg/')
                    .send({
                        questions: questions
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res.body.questionsCreated[0].hid).equal(hid);
                        expect(res.body.questionsCreated[1].hid).equal(hid);
                        expect(res.body.questionsCreated[2].hid).equal(hid);
                        done();
                    })
            });

            it('creating registration questions with options should succeed', function(done) {
                let questions = [
                    {
                        hid: hid,
                        question: 'question one',
                        descr: 'description one',
                        required: false,
                        index: 0,
                        type: 'type on',
                        options: [
                            {
                                option: "q1, option one",
                                index: 0
                            },
                            {
                                option: "q1, option two",
                                index: 1
                            },
                            {
                                option: "q1, option three",
                                index: 2
                            }
                        ]
                    },
                    {
                        hid: hid,
                        question: 'question two',
                        descr: 'description two',
                        required: false,
                        index: 1,
                        type: 'type on'
                    },
                    {
                        hid: hid,
                        question: 'question three',
                        descr: 'description three',
                        required: false,
                        index: 2,
                        type: 'type on',
                        options: [
                            {
                                option: "q3, option one",
                                index: 0
                            },
                            {
                                option: "q3, option two",
                                index: 1
                            },
                            {
                                option: "q3, option three",
                                index: 2
                            }
                        ]
                    },
                ];

                chai.request(app)
                    .post('/a/hacks/reg/')
                    .send({
                        questions: questions
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res.body.questionsCreated[0].hid).equal(hid);
                        expect(res.body.questionsCreated[1].hid).equal(hid);
                        expect(res.body.questionsCreated[2].hid).equal(hid);
                        done();
                    })
            });
            
            it('creating registration question with option that is missing some fields should fail', function(done) {
                let questions = [
                    {
                        hid: hid,
                        question: 'question one',
                        descr: 'description one',
                        required: false,
                        index: 0,
                        type: 'type on',
                        options: [
                            {
                                option: "q1, option one",
                            },
                        ]
                    },
                ];

                chai.request(app)
                    .post('/a/hacks/reg/')
                    .send({
                        questions: questions
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });

            it('creating registration question without hid should fail', function(done) {
                let questions = [
                    {
                        question: 'question one',
                        descr: 'description one',
                        required: false,
                        index: 0,
                        type: 'some type'
                    },
                ];

                chai.request(app)
                    .post('/a/hacks/reg/')
                    .send({
                        questions: questions
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });

            it('creating registration question with bad hid should fail', function(done) {
                let questions = [
                    {
                        hid: badHid,
                        question: 'question one',
                        descr: 'description one',
                        required: false,
                        index: 0,
                        type: 'some type'
                    },
                ];

                chai.request(app)
                    .post('/a/hacks/reg/')
                    .send({
                        questions: questions
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });

            it('creating registration question without token should fail', function(done) {
                let questions = [
                    {
                        question: 'question one',
                        descr: 'description one',
                        required: false,
                        index: 0,
                        type: 'some type'
                    },
                ];

                chai.request(app)
                    .post('/a/hacks/reg/')
                    .send({
                        hid: hid,
                        questions: questions
                    })
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        expect(res).to.have.status(401);
                        done();
                    })
            });

            it('creating registration question with token without admin privileges should fail', function(done) {
                let questions = [
                    {
                        question: 'question one',
                        descr: 'description one',
                        required: false,
                        index: 0,
                        type: 'some type'
                    },
                ];

                chai.request(app)
                    .post('/a/hacks/reg/')
                    .send({
                        hid: hid,
                        questions: questions
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', userToken)
                    .end((err, res) => {
                        expect(res).to.have.status(403);
                        done();
                    })
            });
        });

        describe('PUT /a/hacks/reg', function() {
            it('creating, updating, and deleting questions and options should succeed', function(done) {
                let questionsToCreate = [
                    {
                        hid: hid,
                        question: 'question four',
                        descr: 'description one',
                        required: false,
                        index: 3,
                        type: 'type on',
                    },
                    {
                        hid: hid,
                        question: 'question five',
                        descr: 'description two',
                        required: false,
                        index: 4,
                        type: 'type on',
                        options: [
                            {
                                option: "q5, option one",
                                index: 0
                            },
                            {
                                option: "q5, option two",
                                index: 1
                            },
                            {
                                option: "q5, option three",
                                index: 2
                            }
                        ]
                    }
                ];

                let questionsToUpdate = [
                    {
                        qid: qid[0],
                        question: 'question one',
                        descr: 'description one',
                        required: false,
                        index: 0,
                        type: 'type on',
                    },
                    {
                        qid: qid[1],
                        question: 'question two',
                        descr: 'description two',
                        required: false,
                        index: 1,
                        type: 'type on'
                    },
                ];

                let optionsToUpdate = [
                    {
                        oid: oid[0],
                        option: "1, option one updated",
                        index: 0
                    },
                    {
                        oid: oid[1],
                        option: "1, option one updated",
                        index: 0
                    },
                ]

                let questionsToDelete = [qid[2]]
        
                let optionsToDelete = [oid[2]]
                
                chai.request(app)
                    .put('/a/hacks/reg')
                    .send({
                        questionsToBeCreated: questionsToCreate,
                        questionsToBeUpdated: questionsToUpdate,
                        questionsToBeDeleted: questionsToDelete,
                        optionsToBeUpdated: optionsToUpdate,
                        optionsToBeDeleted: optionsToDelete,
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });

        describe('GET /hacks/reg/:hid', function() {
            it('getting registration questions with hid should succeed', function(done) {
                chai.request(app)
                .get('/hacks/reg/:hid')
                .query({
                    hid: hid,
                })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body[0].qid.length).greaterThan(0)
                    expect(res.body[1].qid.length).greaterThan(0)
                    expect(res.body[2].qid.length).greaterThan(0)
                    done();
                })
            });
    
            it('getting registration questions without should fail', function(done) {
                chai.request(app)
                .get('/hacks/reg/:hid')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                })
            });
    
            it('getting registration questions with bad hid', function(done) {
                chai.request(app)
                .get('/hacks/reg/:hid')
                .query({
                    hid: badHid,
                })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).equals(0)
                    done();
                })
            });
        });

        describe('DELETE /a/hacks/reg/quest/:qid', function() {
            it('deleting registration question with qid should succeed', function(done) {
                chai.request(app)
                .delete('/a/hacks/reg/quest/:qid')
                .query({
                    qid: qid[1],
                })
                .set('Accept', 'application/json')
                .set('ha-api-token', token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
            });
    
            it('deleting registration question without qid should fail', function(done) {
                chai.request(app)
                .delete('/a/hacks/reg/quest/:qid')
                .set('Accept', 'application/json')
                .set('ha-api-token', token)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                })
            });
    
            it('deleting registration question with qid of already deleted question should fail', function(done) {
                chai.request(app)
                .delete('/a/hacks/reg/quest/:qid')
                .query({
                    qid: qid[2],
                })
                .set('Accept', 'application/json')
                .set('ha-api-token', token)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                })
            });

            it('deleting registration question with without token should fail', function(done) {
                chai.request(app)
                .delete('/a/hacks/reg/quest/:qid')
                .query({
                    qid: qid[2],
                })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                })
            });

            it('deleting registration question with with token without admin privileges should fail', function(done) {
                chai.request(app)
                .delete('/a/hacks/reg/quest/:qid')
                .query({
                    qid: qid[1],
                })
                .set('Accept', 'application/json')
                .set('ha-api-token', userToken)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                })
            });
        });
    });

    describe('reg answers', function() {
        describe('POST /hacks/reg/ans', function() {
            it('creating answers should succeed', function(done) {
                let answers = [
                    {
                        qid: qid[0],
                        oid: oid[1],
                        answer: null,
                    },
                ]

                chai.request(app)
                .post('/u/hacks/reg/ans')
                .send({
                    qid: qid[0],
                    answers: answers,
                })
                .set('Accept', 'application/json')
                .set('ha-api-token', userToken)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    done();
                })
            });

            it('creating answers without token should fail', function(done) {
                let answers = [
                    {
                        qid: qid[0],
                        oid: oid[1],
                        answer: null,
                    },
                    {
                        oid: '',
                        answer: 'some answer',
                    }
                ]

                chai.request(app)
                .post('/u/hacks/reg/ans')
                .send({
                    qid: qid[0],
                    answers: answers,
                })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                })
            });

            it('creating answer with missing fields should fail', function(done) {
                let answers = [
                    {
                        qid: qid[0],
                    },
                ]

                chai.request(app)
                .post('/u/hacks/reg/ans')
                .send({
                    qid: qid[0],
                    answers: answers,
                })
                .set('Accept', 'application/json')
                .set('ha-api-token', userToken)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                })
            });

            it('creating answer with invalid qid should fail', function(done) {
                let answers = [
                    {
                        qid: badHid,
                        oid: oid[0],
                        answer: null,
                    },
                ]

                chai.request(app)
                .post('/u/hacks/reg/ans')
                .send({
                    qid: qid[0],
                    answers: answers,
                })
                .set('ha-api-token', userToken)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                })
            });
        });
    });
});