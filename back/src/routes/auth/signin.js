import models from '../../database/models';
import jwt from 'jsonwebtoken';
import constants from './util';
import parseRequest from 'routes/utils/findByField';

const { authcookie } = constants;
const { User } = models;

const responseWithUserSignedIn = (user, res) => {
    const { _id, name, email, about } = user;

    const filteredUser = {
        _id,
        name,
        email,
        about
    };

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie(authcookie, token);

    return res.status(200).json({
        success: true,
        msg: 'User signed in.',
        user: { ...filteredUser }
    });
};

const responseWithMismatch = (user, res) => {
    return res.status(200).json({
        success: false,
        msg: 'Email and password missmatch.',
        data: user.email
    });
};

export default (req, res) => {
    parseRequest(req, res, ['email', 'password']).findByFields(
        User,
        ['email'],
        (user) => {
            if (user.authenticate(req.body.password))
                return responseWithUserSignedIn(user, res);
            else return responseWithMismatch(user, res);
        }
    );
};
