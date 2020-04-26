import models from 'database/models';
import parseRequest from 'routes/utils/createQuery';
import responseWithRecord from 'routes/utils/responseWithRecord';
const { Article } = models;

export default (req, res) => {
    parseRequest(req, res, ['title', 'content', 'article'])
        .createQuery(Article)
        .save(responseWithRecord(res));
};
