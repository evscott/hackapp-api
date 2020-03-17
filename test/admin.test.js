const app = require('../src/index.js');
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const { before, describe, it } = require('mocha');
chai.use(chaiHttp);

describe('admin', () => {
    let token, uid;

    before('login user and get admin-api token', function(done) {
        chai.request(app)
            .put('/auth')
            .send('email=admin')
            .send('password=admin')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.token.length).greaterThan(0);
                expect(res.body.user.uid).lengthOf(36);
                token = res.body.token;
                uid = res.body.user.uid;
                done();
            })
    });

    describe('GET /users', () => {
        it('get user with admin-api token should succeed', function(done) {
            chai.request(app)
                .get('/users')
                .set('Accept', 'application/json')
                .set('ha-api-token', token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.user.uid).equal(uid);
                    done();
                });
        });
    });
});