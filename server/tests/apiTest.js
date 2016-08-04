var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var mongoose = require('mongoose');

chai.use(chaiHttp);

describe('Groups', function () {
    after(function (done) {
        mongoose.connection.db.dropCollection('groups', function (err, result) {
            done();
        });
    });

    var group = {
        'groupName': 'test',
        'title': 'testTitle'
    };

    it('should add a SINGLE group on /groups POST', function (done) {
        chai.request(server)
            .post('/groups')
            .send(group)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            })
    });

    it('should throw 409 error, group exist', function (done) {
        chai.request(server)
            .post('/groups')
            .send(group)
            .end(function (err, res) {
                res.should.have.status(409);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.status.should.equal('This group already exist!');
                done();
            });
    });

    it('should list ALL groups on /groups GET', function (done) {
        chai.request(server)
            .get('/groups')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('groups');
                res.body.groups[0].should.be.a('object');
                done();
            })
    });

    it('should list a SINGLE group on /groups/groupname GET', function (done) {
        chai.request(server)
            .get('/groups/test')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.group.groupName.should.equal('test');
                done();
            })
    });
});

describe('Users', function () {
    after(function (done) {
        mongoose.connection.db.dropCollection('users', function (err, result) {
            done();
        });
    });

    var user = {
        'username': 'test',
        'firstName': 'test',
        'lastName': 'test',
        'email': 'test@test.test',
        'group': '576a4a9fed9c66cd16ffd30b'
    };

    it('should add a SINGLE user on /users POST', function (done) {
        chai.request(server)
            .post('/users')
            .send(user)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    });

    it('should throw 409 error, user exist', function (done) {
        chai.request(server)
            .post('/users')
            .send(user)
            .end(function (err, res) {
                res.should.have.status(409);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.status.should.equal('This user already exist!');
                done();
            });
    });

    it('should list ALL users on /users GET', function (done) {
        chai.request(server)
            .get('/users')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('users');
                res.body.users[0].should.be.a('object');
                done();
            })
    });

    it('should list a SINGLE user on /users/username GET', function (done) {
        chai.request(server)
            .get('/users/test')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            })
    });
});