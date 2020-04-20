import models from '../../database/models';
import jwt from 'jsonwebtoken';
import constants from './util';
import parseRequest from 'routes/utils/findByField';
import responseWithRecordError from 'routes/utils/responseWithRecordError';

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

export default (req, res) => {
    console.log('AM I EVEN THERE AS FUCK')
    parseRequest(req, ['email', 'password'])
        .findByField(User, 'email', (e, user, parsedFields) => {
            console.log('AM I EVEN THERE')
            if (e) return responseWithRecordError(e, res);
            if (!user) return responseWithRecordErrorr(false, res);
            if (user.authenticate(parsedFields.password)) return responseWithUserSignedIn(user, res);
            return responseWithRecordError(false, res);
        })
}


