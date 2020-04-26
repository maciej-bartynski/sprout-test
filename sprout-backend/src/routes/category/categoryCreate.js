import models from 'database/models';
import parseRequest from 'routes/utils/createQuery';
import responseWithRecord from 'routes/utils/responseWithRecord';
const { Category } = models;

export default (req, res) => {
    parseRequest(req, res, ['name', 'description'])
        .createQuery(Category)
        .save(responseWithRecord(res));
};
