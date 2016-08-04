var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Group = new Schema({
    groupName: String,
    title: String
});

module.exports = mongoose.model('groups', Group);