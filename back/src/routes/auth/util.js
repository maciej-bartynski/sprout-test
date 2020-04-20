import expressJwt from 'express-jwt';
import { config } from 'dotenv';
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
