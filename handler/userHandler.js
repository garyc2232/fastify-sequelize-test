const models = require("../models/index")

const getAll = async () => {
    return await models.User.findAll({
        include: [{
            model: models.Tweet,
            as: "Tweets"
        }]
    })
}
const getByID = async (id) => {
    return await models.User.findOne({
        where: {
            id
        },
        include: [{
            model: models.Tweet,
            as: "Tweets"
        }]
    })
}
const create = async ({username, passwd}) => {
    return await models.User.create({
        username,
        passwd
    })
}


module.exports = {
    getAll,
    getByID,
    create
}