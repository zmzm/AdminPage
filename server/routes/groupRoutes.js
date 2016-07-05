var express = require('express');
var router = express.Router();

var Group = require('../models/group.js');
var User = require('../models/user');

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

router.post('/', function (req, res, next) {
    var group = req.body;
    Group.findOne({groupName: group.groupName}, function (err, gr) {
        if (err) {
            return next(err);
        }
        else if (gr) {
            res.status(409).json({
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
            User.find({group: gr._id}).exec(function (err, users) {
                res.status(200).json({
                    group: gr,
                    users: users,
                    status: 'Group found!'
                });
            });
        }
    });
});

router.put('/:id', function (req, res, next) {
    var id = req.params.id,
        group = req.body.group;
    Group.update({_id: id}, {$set: {groupName: group.groupName, title: group.title}}, function (err, gr) {
        if (err) {
            return next(err);
        }
        else if (!gr) {
            res.status(404).json({
                err: 'Group with name ' + groupName + ' not found.'
            });
        }
        else {
            User.find({group: gr._id}).exec(function (err, users) {
                res.status(200).json({
                    group: gr,
                    users: users,
                    status: 'Group successfully updated!'
                });
            });
        }
    });
});

router.get('/autocomplete/query', function (req, res) {
    var regex = new RegExp(req.query.q, 'i');
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

router.get('/page/:pageNum', function (req, res) {
    var page = 1;
    var perPage = 5;
    var totalCount = 0;

    if (req.params.pageNum) {
        page = req.params.pageNum;
    }
    Group.count({}, function (err, count) {
        totalCount = count;
    });
    Group.find().skip((page - 1) * perPage).limit(perPage).exec(function (err, groups) {
        if (err) {
            res.status(500).json({
                status: err,
                err: 'No records found.'
            });
        }
        res.status(200).json({
            groups: groups,
            totalCount: totalCount,
            status: 'Success.'
        });
    });
});

module.exports = router;