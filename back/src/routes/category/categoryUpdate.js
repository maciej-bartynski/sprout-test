import { name } from 'database/models/Category/name';
import parseRequest from 'routes/utils/updateRecord';
import responseWithRecord from 'routes/utils/responseWithRecord';

export default (req, res) => {
    parseRequest(req, name, ['name', 'description'])
        .updateRecord(res)
        .save(responseWithRecord(res));
};
