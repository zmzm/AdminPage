var express = require('express');
var router = express.Router();

var Group = require('../models/group.js');

router.get('/', function (req, res) {
    Group.find({}, function (err, gr) {
        if (err) {
            return res.status(500).json({
                err: 'Oooops something wrong.'
            });
        }
        else {
            res.status(200).json({
                groups: gr,
                status: 'Group list!'
            });
        }
    });
});

router.post('/create', function (req, res, next) {
    var group = req.body;
    Group.findOne({groupName: group.groupName}, function (err, gr) {
        if (err) {
            return next(err);
        }
        else if (gr) {
            res.status(200).json({
                group: gr,
                status: 'This group already exist!'
            });
        }
        else {
            var newGroup = Group(group);
            newGroup.save(function (err, group) {
                if (err) {
                    res.status(500).json({
                        err: 'Could not save group.'
                    });
                }

                res.status(200).json({
                    group: group,
                    status: 'Group saved successfully!!'
                });
            });
        }
    });
});

router.get('/:groupName', function (req, res, next) {
    var groupName = req.params.groupName;
    Group.findOne({groupName: groupName}, function (err, gr) {
        if (err) {
            return next(err);
        }
        else if (gr) {
            res.status(200).json({
                group: gr,
                status: 'Group found!'
            });
        }
    });
});

router.get('/autocomplete/query', function (req, res) {
    var regex = new RegExp(req.query["q"], 'i');
    Group.find({groupName: regex}).limit(5).exec(function (err, gr) {
        if (err) {
            res.status(500).json({
                err: 'Oooops something wrong.'
            });
        }
        else {
            res.status(200).json({
                groups: gr,
                status: 'Group list!'
            });
        }
    });
});

module.exports = router;