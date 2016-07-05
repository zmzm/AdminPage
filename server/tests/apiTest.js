var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('Users', function () {
    it('should list ALL users on /users GET', function (done) {
        chai.request(server)
            .get('/users')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('user');
                res.body.user.should.be.a('object');
                done();
            })
    });
    it('should add a SINGLE user on /users POST', function (done) {
        chai.request(server)
            .post('/users/create')
            .send({
                'username': 'test',
                'firstName': 'test',
                'lastName': 'test',
                'email': 'test@test.test',
                'group': '576a4a9fed9c66cd16ffd30b'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    });
    it('should list a SINGLE user on /users/username GET', function (done) {
        chai.request(server)
            .get('/users/test')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.user.username.should.equal('test');
                done();
            })
    });
});

describe('Groups', function () {
    it('should list ALL groups on /groups GET', function (done) {
        chai.request(server)

    });
    it('should add a SINGLE group on /groups POST', function (done) {
        chai.request(server)

    });
    it('should list a SINGLE user on /users/username GET', function (done) {
        chai.request(server)

    });
});