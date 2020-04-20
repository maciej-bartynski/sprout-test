import models from '../../database/models';
import parseRequest from 'routes/utils/createQuery';
import responseWithRecord from 'routes/utils/responseWithRecord';
const { User } = models;

export default (req, res) => {
    parseRequest(req, res, ['name', 'email', 'password', 'about'])
        .createQuery(User)
        .save((e, user = {}) => {
            user.salt = undefined;
            user.hashed_password = undefined;
            responseWithRecord(res)(e, user);
        });
};
