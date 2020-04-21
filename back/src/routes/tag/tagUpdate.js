import { name } from 'database/models/Tag/name';
import parseRequest from 'routes/utils/updateRecord';
import responseWithRecord from 'routes/utils/responseWithRecord';

export default (req, res) => {
    parseRequest(req, name, ['tag'])
        .updateRecord(res)
        .save(responseWithRecord(res));
};
