require('./db')
const {
    createRelateion
} = require('../models/index')

createRelateion(true).then(() => {
    console.log('createRelateion done');
    sequelize.close();
});