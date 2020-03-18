const app = require('../src/index.js');
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const { before, describe, it } = require('mocha');
chai.use(chaiHttp);

describe('user', () => {
    let token, uid;

    before('create user and get user api token', function(done) {
        chai.request(app)
            .post('/auth')
            .send('firstName=john')
            .send('lastName=doe')
            .send('email=johndoe@email.com')
            .send('password=password')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.token.length).greaterThan(0);
                expect(res.body.user.uid).lengthOf(36);
                token = res.body.token;
                uid = res.body.user.uid;
                done();
            })
    });

    describe('GET /users', () => {
        let expiredToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiMjM0N2ZmMi02MTRmLTExZWEtOWNlYS0wMjQyYWMxMjAwMDIiLCJpYXQiOjE1ODM2ODA4NjQsImV4cCI6MTU4MzcyNDA2NH0.rD7mCuVOUw9OX668PSaOkHNY_WQNy9YzcnsFQY76b8cjQ2NdOS5Xyh16q-xqxPAHMNsULDh0XX82z7Xr9zA7Qojgeg3LK75o-0zhA8lC31WOU4inL4ZpGbdV2Jwz_3vEKFbLiuzv4lUZoXTtywkpUebiSWYVWyB_pFMdYD9wyDJOOSbuSl5pqDFVkuWz5O9RGrWE1vefNIXRr3baAv3c7BccBXOHAbson5T0n-KTnPxAise8FNzKSl_RHMLhtoCNySHOff9OAwy_ammcKTTuMhmWAw7CbaVv2cRgDF8DhRWioO-nVZZBNoYec22oo4j5xz9Q4WkoKmbNIwzJeppl44vzZnRfJW3elSF1FHs9Z0kMvYQuUXigSz0TUGfBZ7h2ZIrWAArVbJf8l6d1oqw1YU2j6qtCcP9k4JTioBf_z2oFbaLyeOf5bjRzRXev58tTGx__QWbCpsNpU4HXurTXeG9YPUxT7s3iYW4UaPQyd_ue6dwpTuMbHsRGcV0LdjSHJBcDLVKP24B-N9vuiflSoWHag8F9tkoCx3Ln4HUkDQTKQVqZgmX3YD-P0mkEZrufYONfWY0bs-xKKG2YcyiNouylKz0Qy6W59NihvYHYRJYESsjlIIb7pO6QVcvizkxvEeJqQstmSeTUCqhnAgYX2Kk3gSZA5Pmbh_v1_0kN7UI';

        it('get user with user-api token should succeed', function(done) {
            chai.request(app)
                .get('/users')
                .set('Accept', 'application/json')
                .set('ha-api-token', token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        });

        it('get user without user-api token should fail', function(done) {
            chai.request(app)
                .get('/users')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                })
        });

        it('get user with expired user-api token should fail', function(done) {
            chai.request(app)
                .get('/users')
                .set('Accept', 'application/json')
                .set('ha-api-token', expiredToken)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                })
        });
    });

    describe('DELETE /users', () => {
        let expiredToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiMjM0N2ZmMi02MTRmLTExZWEtOWNlYS0wMjQyYWMxMjAwMDIiLCJpYXQiOjE1ODM2ODA4NjQsImV4cCI6MTU4MzcyNDA2NH0.rD7mCuVOUw9OX668PSaOkHNY_WQNy9YzcnsFQY76b8cjQ2NdOS5Xyh16q-xqxPAHMNsULDh0XX82z7Xr9zA7Qojgeg3LK75o-0zhA8lC31WOU4inL4ZpGbdV2Jwz_3vEKFbLiuzv4lUZoXTtywkpUebiSWYVWyB_pFMdYD9wyDJOOSbuSl5pqDFVkuWz5O9RGrWE1vefNIXRr3baAv3c7BccBXOHAbson5T0n-KTnPxAise8FNzKSl_RHMLhtoCNySHOff9OAwy_ammcKTTuMhmWAw7CbaVv2cRgDF8DhRWioO-nVZZBNoYec22oo4j5xz9Q4WkoKmbNIwzJeppl44vzZnRfJW3elSF1FHs9Z0kMvYQuUXigSz0TUGfBZ7h2ZIrWAArVbJf8l6d1oqw1YU2j6qtCcP9k4JTioBf_z2oFbaLyeOf5bjRzRXev58tTGx__QWbCpsNpU4HXurTXeG9YPUxT7s3iYW4UaPQyd_ue6dwpTuMbHsRGcV0LdjSHJBcDLVKP24B-N9vuiflSoWHag8F9tkoCx3Ln4HUkDQTKQVqZgmX3YD-P0mkEZrufYONfWY0bs-xKKG2YcyiNouylKz0Qy6W59NihvYHYRJYESsjlIIb7pO6QVcvizkxvEeJqQstmSeTUCqhnAgYX2Kk3gSZA5Pmbh_v1_0kN7UI';

        it('delete user with user-api token should succeed', function(done) {
            chai.request(app)
                .delete('/users')
                .set('Accept', 'application/json')
                .set('ha-api-token', token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        });

        it('delete user without user-api token should fail', function(done) {
            chai.request(app)
                .delete('/users')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                })
        });

        it('delete user with expired user-api token should fail', function(done) {
            chai.request(app)
                .delete('/users')
                .set('Accept', 'application/json')
                .set('ha-api-token', expiredToken)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                })
        });
    });
});