const Tweet = require("./Tweet");
const User = require("./User");

const createRelateion = async (force = false) => {
    User.hasMany(Tweet, {
        as: "Tweets",
        foreignKey: "userId"
    });
    Tweet.belongsTo(User, {
        as: "User",
        foreignKey: "userId"
    });
    await sequelize.sync({ force })
}

module.exports = {
    createRelateion,
    Tweet,
    User
}