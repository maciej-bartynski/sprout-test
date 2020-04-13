const { User } = require("../../dbConfig/models");
const log = require("./../../util/logger");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { authcookie } = require('./util') 

const getUserData = (req) => {
    const { body } = req;
    const allowFields = ['email', 'password'];
    const incomFields = {};
    Object.keys(body).forEach(field => {
        if (allowFields.includes(field)) incomFields[field] = body[field];
    })
    return incomFields;
}

const handleError = (e, res) => {
    const data = {
        success: false,
        msg: 'User not found.',
    }

    if (!e) log.fail(`[routes/auth/signin] Error during signin. Callback run, but data not found.`);

    if (e) {
        log.fail(`[routes/auth/signin] Error during signin. ${e}`);
        data.error = e;
    }

    return res
        .status(400)
        .json(data);
}

const handleSuccess = (user, res) => {
    const { _id, name, email, about } = user;
    const filteredUser = {
        _id,
        name,
        email,
        about
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie(authcookie, token);
    return res
        .status(200)
        .json({
            success: true,
            msg: 'User signed in.',
            user: { ...filteredUser },
        })
}

module.exports = (req, res, next) => {
    const { email, password } = getUserData(req);
    User.findOne({ email }, (e, user) => {
        if (e) return handleError(e, res);
        if (!user) return handleError(false, res);
        if (user.authenticate(password)) return handleSuccess(user, res)
        return handleError(false, res);
    });
}