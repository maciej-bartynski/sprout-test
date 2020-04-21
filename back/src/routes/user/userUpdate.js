import { name } from 'database/models/User/name';
import parseRequest from 'routes/utils/updateRecord';
import responseWithRecord from 'routes/utils/responseWithRecord';

export default (req, res) => {
    const isAuthorized = (req.cookieOwner._id = req.User._id);
    if (!isAuthorized) responseWithRecord(res)('User not authorized');
    else
        parseRequest(req, name, ['name', 'email', 'about'])
            .updateRecord(res)
            .save(responseWithRecord(res));
};
