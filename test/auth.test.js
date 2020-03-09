const request = require('supertest');
const app = require('../src/index.js');
const chai = require('chai');

describe('authentication', () => {
    describe('PUT /auth', () => {
        it('admin login should succeed', () => {
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

        it('admin login should fail with missing arguments', () => {
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

    describe('POST /auth', () => {
        it('user should be created successfully', () => {
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

        it('user should fail to be created with missing arguments', () => {
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
});