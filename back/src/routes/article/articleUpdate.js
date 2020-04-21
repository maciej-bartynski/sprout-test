import { name } from 'database/models/Article/name';
import parseRequest from 'routes/utils/updateRecord';
import responseWithRecord from 'routes/utils/responseWithRecord';

export default (req, res) => {
    parseRequest(req, name, ['title', 'content', 'category', 'author', 'tags'])
        .updateRecord(res)
        .save(responseWithRecord(res));
};
