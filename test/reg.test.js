const app = require('../src/index.js');
const chai = require("chai");
const { before, describe, it } = require('mocha');
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);

describe('registration', function() {
    let token, userToken, hid, badHid = '8f717842-62e1-11ea-9ba6-0242ac190002';

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

    describe('reg questions', function() {
        describe('POST /a/hacks/reg/quest', function() {
            it('creating registration questions without options should succeed', function(done) {
                let questions = [
                    {
                        question: 'question one',
                        descr: 'description one',
                        required: false,
                        index: 0,
                        type: 'type on'
                    },
                    {
                        question: 'question two',
                        descr: 'description two',
                        required: false,
                        index: 1,
                        type: 'type on'
                    },
                    {
                        question: 'question three',
                        descr: 'description three',
                        required: false,
                        index: 2,
                        type: 'type on'
                    },
                ];

                chai.request(app)
                    .post('/a/hacks/reg/quest/')
                    .send({
                        hid: hid,
                        questions: questions
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res.body[0].hid).equal(hid);
                        expect(res.body[1].hid).equal(hid);
                        expect(res.body[2].hid).equal(hid);
                        done();
                    })
            });

            it('creating registration questions with options should succeed', function(done) {
                let questions = [
                    {
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
                                index: 0
                            },
                            {
                                option: "q1, option three",
                                index: 0
                            }
                        ]
                    },
                    {
                        question: 'question two',
                        descr: 'description two',
                        required: false,
                        index: 1,
                        type: 'type on'
                    },
                    {
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
                                index: 0
                            },
                            {
                                option: "q3, option three",
                                index: 0
                            }
                        ]
                    },
                ];

                chai.request(app)
                    .post('/a/hacks/reg/quest/')
                    .send({
                        hid: hid,
                        questions: questions
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res.body[0].hid).equal(hid);
                        expect(res.body[1].hid).equal(hid);
                        expect(res.body[2].hid).equal(hid);
                        done();
                    })
            });   
        });
    });
});