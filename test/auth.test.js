const request = require('supertest');
const app = require('../src/index.js');
const mocha = require('mocha');
const chai = require('chai');

mocha.describe('PUT /auth', function() {
    mocha.it('admin login should succeed', function () {
        request(app)
            .put('/auth')
            .send('email=admin')
            .send('password=admin')
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                chai.expect(res.body.token).lengthOf(828);
            });
    });

    mocha.it('admin login should fail with missing arguments', function () {
        request(app)
            .put('/auth')
            .send('email=admin')
            .expect(400);

        request(app)
            .put('/auth')
            .send('password=password')
            .expect(400)
    });
});

mocha.describe('POST /auth', function() {
    mocha.it('user should be created successfully', function () {
        request(app)
            .post('/auth')
            .send('firstName=john')
            .send('lastName=doe')
            .send('email=johndoe@email.com')
            .send('password=password')
            .set('Accept', 'application/json')
            .expect(201)
            .then((res) => {
                chai.expect(res.body.token).lengthOf(828);
            });
    });

    mocha.it('user should fail to be created with missing arguments', function () {
        request(app)
            .post('/auth')
            .send('lastName=doe')
            .send('email=johndoe@email.com')
            .send('password=password')
            .expect(400);

        request(app)
            .post('/auth')
            .send('firstName=john')
            .send('email=johndoe@email.com')
            .send('password=password')
            .expect(400);

        request(app)
            .post('/auth')
            .send('firstName=john')
            .send('lastName=doe')
            .send('password=password')
            .expect(400);

        request(app)
            .post('/auth')
            .send('firstName=john')
            .send('lastName=doe')
            .send('email=johndoe@email.com')
            .expect(400);
    });
});