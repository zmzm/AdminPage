var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    group: {
        type: Schema.ObjectId,
        refs: 'groups'
    }
});

module.exports = mongoose.model('users', User);