import models from 'database/models';
import parseRequest from 'routes/utils/createQuery';
import responseWithRecord from 'routes/utils/responseWithRecord';
const { Tag } = models;

export default (req, res) => {
    parseRequest(req, res, ['tag'])
        .createQuery(Tag)
        .save(responseWithRecord(res));
};
