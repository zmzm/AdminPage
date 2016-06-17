var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var User = require('../models/user');

router.post('/create', function (req, res, next) {
    var user = req.body;
    return res.status(200).json({
        user: user,
        status: 'User created successfully!'
    });
});

module.exports = router;