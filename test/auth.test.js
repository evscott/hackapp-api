const app = require('../src/index.js');
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const { before, describe, it } = require('mocha');
chai.use(chaiHttp);

before('wait for db migrations', function(done) {
    setTimeout(()=>{
        done();
    },1500);
});

describe('authentication', () => {
    describe('PUT /auth', () => {
        it('admin login should succeed', function(done) {
            chai.request(app)
                .put('/auth')
                .send('email=admin')
                .send('password=admin')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        });

        it('admin login should fail with missing password', function(done) {
            chai.request(app)
                .put('/auth')
                .send('password=password')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('admin login should fail with missing email', function(done) {
            chai.request(app)
                .put('/auth')
                .send('password=password')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe('POST /auth', () => {
        it('user should be created successfully', function(done) {
            chai.request(app)
                .post('/auth')
                .send('firstName=john')
                .send('lastName=doe')
                .send('email=johndoe@email.com')
                .send('password=password')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.body.token.length).greaterThan(0);
                    done();
                });
        });

        it('user should fail to be created with missing first name', function(done) {
            chai.request(app)
                .post('/auth')
                .send('lastName=doe')
                .send('email=johndoe@email.com')
                .send('password=password')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('user should fail to be created with missing last name', function(done) {
            chai.request(app)
                .post('/auth')
                .send('firstName=john')
                .send('email=johndoe@email.com')
                .send('password=password')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('user should fail to be created with missing email', function(done) {
            chai.request(app)
                .post('/auth')
                .send('firstName=john')
                .send('lastName=doe')
                .send('password=password')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('user should fail to be created with missing password', function(done) {
            chai.request(app)
                .post('/auth')
                .send('firstName=john')
                .send('lastName=doe')
                .send('email=johndoe@email.com')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
});