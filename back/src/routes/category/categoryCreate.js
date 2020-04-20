import models from 'database/models';
import parseRequest from 'routes/utils/parseRequest';
import responseWithRecord from 'routes/utils/responseWithRecord';
const { Category } = models;

export default (req, res) => {
    parseRequest(req, ["name"])
        .createQuery(Category)
        .save(responseWithRecord(res));
}