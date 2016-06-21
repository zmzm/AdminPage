var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var User = require('../models/user.js');

router.post('/create', function (req, res, next) {
    var userModel = req.body;
    User.find({$or: [{email: userModel.email}, {username: userModel.username}]}, function (err, user) {
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

module.exports = router;