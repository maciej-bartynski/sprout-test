import resolveFields from 'routes/utils/resolveFields';
import responseWithRecordError from 'routes/utils/responseWithRecordError';

const parseRequest = (req, res, fieldNames) => {
    return {
        fields: resolveFields(req, res, fieldNames),
        findByFields: function (Model, params, callback) {
            const fields = {};
            if (this.fields) {
                params.forEach((param) => (fields[param] = this.fields[param]));
                return Model.findOne(fields, (e, record) => {
                    if (e || !record) return responseWithRecordError(e, res);
                    callback(record);
                });
            }
        }
    };
};

export default parseRequest;
