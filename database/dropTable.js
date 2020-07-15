require('./db')
const {
    Tweet,
    User
} = require('../models/index')

const drop = async () => {
    await Tweet.drop();
    await User.drop();
    return;
}

drop().then(() => {
    console.log('dropTable done');
    sequelize.close();
})