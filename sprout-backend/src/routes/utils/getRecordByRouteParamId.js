import models from 'database/models';
import log from 'priv_modules/logger';

const getRecordByRouteParamId = (modelName) => (req, _, next, routeParam) => {
    const Model = models[modelName];
    Model.findById(routeParam).exec((e, record) => {
        if (e) log.fail(`[routes/utils/getRecordByRouteParamId] ${e}`);
        if (!record)
            log.fail(`[routes/utils/getRecordByRouteParamId] Data not found.`);
        if (record) req[modelName] = record;
        next();
    });
};

export default getRecordByRouteParamId;
