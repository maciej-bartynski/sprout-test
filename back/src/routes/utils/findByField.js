import resolveFields from 'routes/utils/resolveFields';

const parseRequest = (req, fieldNames) => {
    return {
        fields: resolveFields(req, fieldNames),
        findByField: function (Model, fieldName, callback) {
            const findBy = { fieldName: this.fields[fieldName] };
            Model.findOne(findBy, (e, record) => {
                callback(e, record, this.fields);
            });
        },

    }
}

export default parseRequest;