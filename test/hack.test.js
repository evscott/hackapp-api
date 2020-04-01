const app = require('../src/index.js');
const chai = require("chai");
const { before, describe, it } = require('mocha');
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);

describe('hackathon', function() {
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

    describe('hackathon overview', function() {
        describe('POST /a/hacks', function() {
            let expiredToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyYzA2OTcxNC02MDk0LTExZWEtODM2My0wMjQyYWMxMjAwMDIiLCJpYXQiOjE1ODM2MDI2ODAsImV4cCI6MTU4MzY0NTg4MH0.Udx99JJ7y2u_YXv7IUtmcfoUzDDTPVkVbMWkkBS_MVdtWdiRzei87TBaifvU7IvVqdgShxaI9-8q34r2f5De3cVjtHJ-eIET2nu73PJQHLLs15NZYwbfqjVa547moG5kuoaONuqwYXkTr-RC0CAD75uTE82WsOP8Q9Qv_9ybPZh8YDJ0Nj6yD5ANztFjSeSoQzfBRGTu0TryFIpF9GJ5YzNicZBJ4XszIJf7fncpDAcyRO2Q9ORsnSzSlX4gwu5VjntCq2m-oXY7XhLh0RgAXqDZVapy3QwxquN-kkMhVcvDwCc_nR3gUlo1HU_g0i1SJ3NhwPlKx1sc3AkYbQ1PMJgNqUWLB82wpqDsJmWDVfPzwPhy740MVoOhdNJTmBCZ01dhAE8l87SHc6LTvUqlMm2xjqvDuuWJITGv5edtnoGziygw4T9JChl6CmwOjdMATdGAED8NABG1O8UzVLqAErQPDVxZT5oT4ZxOMkoZmzP45uDjewetFs-GuPaGkjaBRAN4IGESoYA5iFJ6366t95SrzfEOlw7HYXZBtcSOQR4G1XZ7sFPEiEkm5geoa4PNSAmNHheekI--FnkMech2eIrUidit_W1BXNZmPIESAMtV4IGrg_8olEtgPUOvdjv48WIj__n_b3bUjqwjTj-rcjm8E9Y2hxti4hxwh20OLMo'

            it('create hackathon overview should succeed', function(done) {
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
                        done();
                    })
            });

            it('create hackathon overview without admin-token should fail', function(done) {
                chai.request(app)
                    .post('/a/hacks')
                    .send('name=MtaHacks')
                    .send('startDate=1999-01-08 04:05:06')
                    .send('endDate=1999-01-09 04:05:06')
                    .send('location=MtA')
                    .send('maxReg=100')
                    .send('regDeadline=1999-01-09 04:05:06')
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        expect(res).to.have.status(401);
                        done();
                    })
            });

            it('create hackathon overview with expired admin-token should fail', function(done) {
                chai.request(app)
                    .post('/a/hacks')
                    .send('name=MtaHacks')
                    .send('startDate=1999-01-08 04:05:06')
                    .send('endDate=1999-01-09 04:05:06')
                    .send('location=MtA')
                    .send('maxReg=100')
                    .send('regDeadline=1999-01-09 04:05:06')
                    .set('Accept', 'application/json')
                    .set('ha-api-token', expiredToken)
                    .end((err, res) => {
                        expect(res).to.have.status(403);
                        done();
                    })
            });

            it('create hackathon overview without name should fail', function(done) {
                chai.request(app)
                    .post('/a/hacks')
                    .send('startDate=1999-01-08 04:05:06')
                    .send('endDate=1999-01-09 04:05:06')
                    .send('location=MtA')
                    .send('maxReg=100')
                    .send('regDeadline=1999-01-09 04:05:06')
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });

            it('create hackathon overview without start date should fail', function(done) {
                chai.request(app)
                    .post('/a/hacks')
                    .send('name=MtaHacks')
                    .send('endDate=1999-01-09 04:05:06')
                    .send('location=MtA')
                    .send('maxReg=100')
                    .send('regDeadline=1999-01-09 04:05:06')
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });

            it('create hackathon overview without end date should fail', function(done) {
                chai.request(app)
                    .post('/a/hacks')
                    .send('name=MtaHacks')
                    .send('startDate=1999-01-08 04:05:06')
                    .send('location=MtA')
                    .send('maxReg=100')
                    .send('regDeadline=1999-01-09 04:05:06')
                    .send('regDeadline=1999-01-09 04:05:06')
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });

            it('create hackathon overview without location should fail', function(done) {
                chai.request(app)
                    .post('/a/hacks')
                    .send('name=MtaHacks')
                    .send('startDate=1999-01-08 04:05:06')
                    .send('endDate=1999-01-09 04:05:06')
                    .send('maxReg=100')
                    .send('regDeadline=1999-01-09 04:05:06')
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });

            it('create hackathon overview without max registration should fail', function(done) {
                chai.request(app)
                    .post('/a/hacks')
                    .send('name=MtaHacks')
                    .send('startDate=1999-01-08 04:05:06')
                    .send('endDate=1999-01-09 04:05:06')
                    .send('location=MtA')
                    .send('regDeadline=1999-01-09 04:05:06')
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });

            it('create hackathon overview without registration deadline should fail', function(done) {
                chai.request(app)
                    .post('/a/hacks')
                    .send('name=MtaHacks')
                    .send('startDate=1999-01-08 04:05:06')
                    .send('endDate=1999-01-09 04:05:06')
                    .send('location=MtA')
                    .send('maxReg=100')
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });
        });

        describe('PUT /hacks', function() {
            it('update hackathon overview should succeed', function(done) {
                chai.request(app)
                    .put('/a/hacks')
                    .send(`hid=${hid}`)
                    .send('name=MtaHacks')
                    .send('startDate=1999-01-08 04:05:06')
                    .send('endDate=1999-01-09 20:05:06')
                    .send('location=MtA')
                    .send('maxReg=100')
                    .send('regDeadline=1999-01-09 04:05:06')
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body.hid).lengthOf(36);
                        done();
                    })
            });

            it('update hackathon overview without all values should fail', function(done) {
                chai.request(app)
                    .put('/a/hacks')
                    .send(`hid=${hid}`)
                    .send('name=MtaHacks')
                    .send('startDate=1999-01-08 04:05:06')
                    .send('location=MtA')
                    .send('maxReg=100')
                    .send('regDeadline=1999-01-09 04:05:06')
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });
        });

        describe('GET /hacks/:hid', function() {
            it('getting hackathon overview by hid should succeed', function(done) {
                chai.request(app)
                    .get('/hacks/ov/:hid')
                    .query({hid: hid})
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body.hid).equal(hid);
                        expect(res.body.name).equal('MtaHacks');
                        done();
                    })
            });

            it('getting hackathon overview without hid should fail', function(done) {
                chai.request(app)
                    .get('/hacks/ov/:hid')
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });

            it('getting hackathon overview with bad hid should fail', function(done) {
                chai.request(app)
                    .get('/hacks/ov/:hid')
                    .query({hid: badHid})
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    })
            });
        });
    });

    describe('hackathon details', () => {
        let did = [], badDID = '8f717842-62e1-11ea-9ba6-0242ac190002';

        before('creating hackathon details to get did\'s should succeed', function(done) {
            let details = [
                {
                    detail: 'detail one',
                    index: 0,
                },
                {
                    detail: 'detail two',
                    index: 1,
                }
            ]
            chai.request(app)
                .post('/a/hacks/det')
                .send(`hid=${hid}`)
                .send({
                    hid: hid,
                    details: details
                })
                .set('Accept', 'application/json')
                .set('ha-api-token', token)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body[0].did.length).greaterThan(0);
                    expect(res.body[1].did.length).greaterThan(0);
                    did[0] = res.body[0].did;
                    did[1] = res.body[1].did;
                    done();
                })
        });
        
        describe('POST /a/hacks/det', function() {
            it('creating hackathon details should succeed', function(done) {
                let details = [
                    {
                        detail: 'detail one',
                        index: 0,
                    },
                    {
                        detail: 'detail two',
                        index: 1,
                    }
                ]
                chai.request(app)
                    .post('/a/hacks/det')
                    .send(`hid=${hid}`)
                    .send({
                        hid: hid,
                        details: details
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res.body[0].did.length).greaterThan(0);
                        expect(res.body[1].did.length).greaterThan(0);
                        done();
                    })
            });

            it('creating hackathon details with missing fields should fail', function(done) {
                let details = [
                    {
                        detail: 'detail one',
                    },
                    {
                        detail: 'detail two',
                        index: 1,
                    }
                ]
                chai.request(app)
                    .post('/a/hacks/det')
                    .send(`hid=${hid}`)
                    .send({
                        hid: hid,
                        details: details
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });

            it('creating hackathon details with missing token should fail', function(done) {
                let details = [
                    {
                        detail: 'detail one',
                        index: 0,

                    },
                    {
                        detail: 'detail two',
                        index: 1,
                    }
                ]
                chai.request(app)
                    .post('/a/hacks/det')
                    .send(`hid=${hid}`)
                    .send({
                        hid: hid,
                        details: details
                    })
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        expect(res).to.have.status(401);
                        done();
                    })
            });

            it('creating hackathon details with token without admin credentials should fail', function(done) {
                let details = [
                    {
                        detail: 'detail one',
                        index: 0,
                    },
                    {
                        detail: 'detail two',
                        index: 1,
                    }
                ]
                chai.request(app)
                    .post('/a/hacks/det')
                    .send(`hid=${hid}`)
                    .send({
                        hid: hid,
                        details: details
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', userToken)
                    .end((err, res) => {
                        expect(res).to.have.status(403);
                        done();
                    })
            });
        });

        describe('PUT /a/hacks/det', function() {
            it('updating hackathon details should succeed', function(done) {
                let details = [
                    {
                        did: did[0],
                        detail: 'detail one updated',
                        index: 1,
                    },
                    {
                        did: did[1],
                        detail: 'detail two updated',
                        index: 0,
                    }
                ]
                chai.request(app)
                    .put('/a/hacks/det')
                    .send({
                        details: details
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body[0].did.length).greaterThan(0);
                        expect(res.body[1].did.length).greaterThan(0);
                        expect(res.body[0].detail).equal(details[0].detail);
                        expect(res.body[1].detail).equal(details[1].detail);
                        expect(res.body[0].index).equal(details[0].index);
                        expect(res.body[1].index).equal(details[1].index);
                        done();
                    })
            });

            it('updating hackathon details with invalid did should fail', function(done) {
                let details = [
                    {
                        did: badDID,
                        detail: 'detail one updated',
                        index: 1,
                    },
                    {
                        did: did[1],
                        detail: 'detail two updated',
                        index: 0,
                    }
                ]
                chai.request(app)
                    .put('/a/hacks/det')
                    .send({
                        details: details
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    })
            });

            it('updating hackathon details with missing fields should fail', function(done) {
                let details = [
                    {
                        did: did[0],
                        index: 1,
                    },
                    {
                        did: did[1],
                        detail: 'detail two updated',
                        index: 0,
                    }
                ]
                chai.request(app)
                    .put('/a/hacks/det')
                    .send({
                        details: details
                    })
                    .set('Accept', 'application/json')
                    .set('ha-api-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });
        });

        describe('GET /hacks/det/:hid', function() {
            it('getting hackathon details should succeed', function(done) {
                chai.request(app)
                    .get('/hacks/det/:hid')
                    .query({
                        hid: hid
                    })
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body[0].did.length).greaterThan(0);
                        expect(res.body[1].did.length).greaterThan(0);
                        done();
                    })
            });

            it('getting hackathon details without hid should fail', function(done) {
                chai.request(app)
                    .get('/hacks/det/:hid')
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    })
            });

            it('getting hackathon details with bad hid should fail', function(done) {
                chai.request(app)
                    .get('/hacks/det/:hid')
                    .set('Accept', 'application/json')
                    .query({
                        hid: badHid
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    })
            });
        });

        describe('DELETE /a/hacks/det/:hid', function() {
            it('deleting hackathon detail should succeed', function(done) {
                chai.request(app)
                    .delete('/a/hacks/det/:hid')
                    .query({
                        did: did[0]
                    })
                    .set('ha-api-token', token)
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });

            it('deleting hackathon detail with orphan did should fail', function(done) {
                chai.request(app)
                    .delete('/a/hacks/det/:hid')
                    .query({
                        did: did[0]
                    })
                    .set('ha-api-token', token)
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });

            it('deleting hackathon detail without did should fail', function(done) {
                chai.request(app)
                    .delete('/a/hacks/det/:hid')
                    .set('ha-api-token', token)
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    });
            });

            it('deleting hackathon detail without token should fail', function(done) {
                chai.request(app)
                    .delete('/a/hacks/det/:hid')
                    .query({
                        did: did[0]
                    })
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        expect(res).to.have.status(401);
                        done();
                    });
            });

            it('deleting hackathon detail with token without admin privileges should fail', function(done) {
                chai.request(app)
                    .delete('/a/hacks/det/:hid')
                    .query({
                        did: did[0]
                    })
                    .set('ha-api-token', userToken)
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        expect(res).to.have.status(403);
                        done();
                    });
            });
        });
    })

    describe('DELETE /hacks', function () {
        it('should delete hackathon successfully', function(done) {
            chai.request(app)
                .delete('/a/hacks/:hid')
                .query({
                    hid: hid
                })
                .set('ha-api-token', token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
        
        it('should fail to delete missing hackathon', function(done) {
            chai.request(app)
                .delete('/a/hacks/:hid')
                .query({
                    hid: hid
                })
                .set('ha-api-token', token)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });

        it('should fail to delete hackathon with missing hid', function(done) {
            chai.request(app)
                .delete('/a/hacks/:hid')
                .set('ha-api-token', token)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('should fail to delete hackathon with invalid hid', function(done) {
            chai.request(app)
                .delete('/a/hacks/:hid')
                .query({
                    hid: badHid
                })
                .set('ha-api-token', token)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });

        it('should fail to delete hackathon without token', function(done) {
            chai.request(app)
                .delete('/a/hacks/:hid')
                .query({hid: hid})
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });

        it('should fail to delete hackathon with token without admin credentials', function(done) {
            chai.request(app)
                .delete('/a/hacks/:hid')
                .query({hid: hid})
                .set('ha-api-token', userToken)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                });
        });
    });
});