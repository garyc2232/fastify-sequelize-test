const models = require("../models/index")

const getAll = async () => {
    return await models.Tweet.findAll()
}
const getByID = async (id) => {
    return await models.Tweet.findOne({
        where: {
            id
        }
    })
}
const create = async ({content, userId}) => {
    return await models.Tweet.create({
        content,
        userId
    })
}


module.exports = {
    getAll,
    getByID,
    create
}