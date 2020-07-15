const Sequelize = require("sequelize");
const dbConfig = require('../config/config.json')
const info = dbConfig['development']
const sequelize = new Sequelize(info.database, info.username, info.password, {
    host: info.host,
    dialect: info.dialect,
    logging: false,
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
    },
    // timezone: '+08:00'
    timezone: 'Etc/GMT-8'
});
module.exports = sequelize;
global.sequelize = sequelize;