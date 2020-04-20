import resolveFields from 'routes/utils/resolveFields';

const parseRequest = (req, fieldNames) => {
    return {
        fields: resolveFields(req, fieldNames),
        createQuery: function (Creator) {
            return new Creator(this.fields);
        }
    }
}

export default parseRequest;