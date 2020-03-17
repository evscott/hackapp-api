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
                expect(res.body.token.length).greaterThan(0);
                token = res.body.token;
                done();
            })
    });

    describe('POST /org', () => {
        let expiredToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyYzA2OTcxNC02MDk0LTExZWEtODM2My0wMjQyYWMxMjAwMDIiLCJpYXQiOjE1ODM2MDI2ODAsImV4cCI6MTU4MzY0NTg4MH0.Udx99JJ7y2u_YXv7IUtmcfoUzDDTPVkVbMWkkBS_MVdtWdiRzei87TBaifvU7IvVqdgShxaI9-8q34r2f5De3cVjtHJ-eIET2nu73PJQHLLs15NZYwbfqjVa547moG5kuoaONuqwYXkTr-RC0CAD75uTE82WsOP8Q9Qv_9ybPZh8YDJ0Nj6yD5ANztFjSeSoQzfBRGTu0TryFIpF9GJ5YzNicZBJ4XszIJf7fncpDAcyRO2Q9ORsnSzSlX4gwu5VjntCq2m-oXY7XhLh0RgAXqDZVapy3QwxquN-kkMhVcvDwCc_nR3gUlo1HU_g0i1SJ3NhwPlKx1sc3AkYbQ1PMJgNqUWLB82wpqDsJmWDVfPzwPhy740MVoOhdNJTmBCZ01dhAE8l87SHc6LTvUqlMm2xjqvDuuWJITGv5edtnoGziygw4T9JChl6CmwOjdMATdGAED8NABG1O8UzVLqAErQPDVxZT5oT4ZxOMkoZmzP45uDjewetFs-GuPaGkjaBRAN4IGESoYA5iFJ6366t95SrzfEOlw7HYXZBtcSOQR4G1XZ7sFPEiEkm5geoa4PNSAmNHheekI--FnkMech2eIrUidit_W1BXNZmPIESAMtV4IGrg_8olEtgPUOvdjv48WIj__n_b3bUjqwjTj-rcjm8E9Y2hxti4hxwh20OLMo'

        it('create org with admin-token token should succeed', function(done) {
            chai.request(app)
                .post('/org')
                .send('name=neworg')
                .set('Accept', 'application/json')
                .set('ha-api-token', token)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body.org.name).equal('neworg');
                    done();
                })
        });

        it('create org without admin-token token should fail', function(done) {
            chai.request(app)
                .post('/org')
                .send('name=neworg')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                })
        });

        it('create org with expired admin-token token should fail', function(done) {
            chai.request(app)
                .post('/org')
                .send('name=neworg')
                .set('Accept', 'application/json')
                .set('ha-api-token', expiredToken)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                })
        });

        it('create org without organization name should fail', function(done) {
            chai.request(app)
                .post('/org')
                .set('Accept', 'application/json')
                .set('ha-api-token', token)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                })
        });
    });

    describe('GET /org', () => {
        it('getting org should succeed', function(done) {
            chai.request(app)
                .get('/org')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.org.name).equal('neworg');
                    done();
                })
        });
    });
});