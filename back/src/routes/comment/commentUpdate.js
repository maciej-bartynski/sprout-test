import { name } from 'database/models/Comment/name';
import parseRequest from 'routes/utils/updateRecord';
import responseWithRecord from 'routes/utils/responseWithRecord';

export default (req, res) => {
    parseRequest(req, name, ['title', 'content'])
        .updateRecord(res)
        .save(responseWithRecord(res));
};
