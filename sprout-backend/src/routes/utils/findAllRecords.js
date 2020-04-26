import responseWithRecords from 'routes/utils/responseWithRecord';
import models from 'database/models';
const findAllRecords = (modelName, res) => {
    models[modelName].find().exec(responseWithRecords(res));
};
export default findAllRecords;
