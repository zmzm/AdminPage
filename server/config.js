var config = {};

config.development = {
    host: 'mongodb://localhost/',
    database: 'admin'
};

config.test = {
    host: 'mongodb://localhost/',
    database: 'admin-test'
};

module.exports = config;