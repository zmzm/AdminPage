var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            res.status(500).json({
                err: 'Oooops something wrong.'
            });
        }
        else {
            res.status(200).json({
                users: users,
                status: 'User list!'
            });
        }
    });
});

router.post('/', function (req, res, next) {
    var userModel = req.body;
    User.findOne({$or: [{email: userModel.email}, {username: userModel.username}]}).exec(function (err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            res.status(409).json({
                user: user,
                status: 'This user already exist!'
            });
        }
        else {
            var newUser = User(userModel);
            newUser.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        err: 'Could not save user.'
                    });
                }

                res.status(200).json({
                    user: user,
                    status: 'User saved successfully!!'
                });
            });
        }
    });
});

router.get('/:userName', function (req, res, next) {
    var userName = req.params.userName;
    User.find({username: userName}).populate(
        {
            path: 'group',
            model: 'groups'
        }
    ).exec(function (err, user) {
        if (err) {
            return next(err);
        }
        else if (user) {
            res.status(200).json({
                user: user,
                status: 'User found!'
            });
        }
    });
});

router.put('/:id', function (req, res, next) {
    var id = req.params.id,
        user = req.body.user;
    User.find({
        $or: [{email: user.email}, {username: user.username}],
        $and: [{_id: {$ne: id}}]
    }).exec(function (err, us) {
        if (err) {
            return next(err);
        }
        if (us.length > 0) {
            res.status(409).json({
                user: us,
                status: 'User with this username/email already exists!'
            });
        }
        else {
            User.update({_id: id}, {
                $set: {
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }, function (err, us) {
                if (err) {
                    return next(err);
                }
                else {
                    res.status(200).json({
                        user: us,
                        status: 'User successfully updated!'
                    });
                }
            });
        }
    });
});

router.delete('/:id/groups/:id1', function (req, res, next) {
    var userId = req.params.id,
        groupId = req.params.id1;
    User.findOneAndUpdate({_id: userId}, {
        $pull: {
            group: {$in: [groupId]}
        }
    }).exec(function (err, us) {
        if (err) {
            return next(err);
        }
        else if (!us) {
            res.status(404).json({
                err: 'User with name ' + user.username + ' not found.'
            });
        }
        else {
            User.findOne({_id: userId}).populate({path: 'group', model: 'groups'}).exec(function (err, result) {
                res.status(200).json({
                    user: result,
                    status: 'User successfully updated!'
                });
            })
        }
    });
});

router.put('/:id/groups', function (req, res, next) {
    var id = req.params.id,
        group = req.body.group;
    User.findOneAndUpdate({_id: id}, {
        $push: {
            group: group
        }
    }).exec(function (err, us) {
        if (err) {
            return next(err);
        }
        else if (!us) {
            res.status(404).json({
                err: 'User with name ' + us.username + ' not found.'
            });
        }
        else {
            User.findOne({_id: id}).populate({path: 'group', model: 'groups'}).exec(function (err, result) {
                res.status(200).json({
                    user: result,
                    status: 'User successfully updated!'
                });
            })
        }
    });
});

router.get('/page/:pageNum', function (req, res) {
    var page = 1;
    var perPage = 5;
    var totalCount = 0;

    if (req.params.pageNum) {
        page = req.params.pageNum;
    }
    User.count({}, function (err, count) {
        totalCount = count;
    });
    User.find().skip((page - 1) * perPage).limit(perPage).exec(function (err, users) {
        if (err) {
            res.status(500).json({
                tt: err,
                err: 'No records found.'
            });
        }
        res.status(200).json({
            users: users,
            totalCount: totalCount,
            status: 'Success.'
        });
    });
});

module.exports = router;