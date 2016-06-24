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

router.post('/create', function (req, res, next) {
    var userModel = req.body;
    User.findOne({email: userModel.email, username: userModel.username}, function (err, user) {
        if (err) {
            return next(err);
        }
        else if (user) {
            res.status(200).json({
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

module.exports = router;