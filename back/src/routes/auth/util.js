import expressJwt from 'express-jwt';
import models from 'database/models';
import { name } from 'database/models/User/name';
import { config } from 'dotenv';
import log from 'util/logger';
config();

const constants = Object.freeze({
    authcookie: 'sprout[t]',
    decodedProperty: 'user_auth'
});

export default constants;

export const checkRequestAuthcookie = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: constants.decodedProperty,
    getToken: function (req) {
        const cookie =
            (req.cookies && req.cookies[constants.authcookie]) || null;
        return cookie;
    }
});

export const isUserAuthorised = (req, res, next) => {
    const decodedUserId = req[constants.decodedProperty]._id;
    const UserModel = models[name];
    UserModel.findById(decodedUserId).exec((e, record) => {
        if (e) log.fail(`[routes/auth/util] ${e}`);
        if (!record) log.fail(`[routes/auth/util] Data not found.`);
        if (record) req.cookieOwner = record;
        next();
    });
};
