var express = require('express');
var expressSession = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var userRoutes = require('./routes/userRoutes');
var groupRoutes = require('./routes/groupRoutes');
var config = require('./config.js');

if (app.get('env') === 'development') {
    mongoose.connect(config.development.host + config.development.database);
    console.log('development')
}
else {
    mongoose.connect(config.test.host + config.test.database);
    console.log('test');
}

app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'unicorn',
    resave: false,
    saveUninitialized: false
}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.use('/users/', userRoutes);
app.use('/groups/', groupRoutes);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message,
        error: {}
    }));
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port 3000');
});
module.exports = app;