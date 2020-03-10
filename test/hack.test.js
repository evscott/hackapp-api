const app = require('../src/index.js');
const chai = require("chai");
const { before, describe, it } = require('mocha');
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);

describe('organization', () => {
    let token;

    before('get admin api token', function(done) {
        chai.request(app)
            .put('/auth')
            .send('email=admin')
            .send('password=admin')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.token).lengthOf(828);
                token = res.body.token;
                done();
            })
    });
});