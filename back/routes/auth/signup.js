const { User } = require("../../dbConfig/models");
const log = require("./../../util/logger");

const getNewUserData = (req) => {
    const { body } = req;
    const allowFields = ['name', 'email', 'password', 'about'];
    const incomFields = {};
    Object.keys(body).forEach(field => {
        if (allowFields.includes(field)) incomFields[field] = body[field];
    })
    return incomFields;
}

const handleError = (e, res) => {
    const data = {
        success: false,
        msg: 'User not signed up.',
    }

    if (!e) log.fail(`[routes/auth/signup] Error during saving user. Callback run, but data not found.`);

    if (e) {
        log.fail(`[routes/auth/signup] Error during saving user. ${e}`);
        data.error = e;
    }

    return res
        .status(400)
        .json(data);
}

const handleSuccess = (user, res) => {
    user.salt = undefined;
    user.hashed_password = undefined;
    return res
        .status(200)
        .json({
            success: true,
            msg: 'User signed up.',
            user,
        })
}

module.exports = (req, res, next) => {
    const fields = getNewUserData(req);
    const user = new User(fields);
    user.save((e, user) => {
        if (e) return handleError(e, res);
        if (!user) return handleError(false, res);
        return handleSuccess(user, res)
    })
}