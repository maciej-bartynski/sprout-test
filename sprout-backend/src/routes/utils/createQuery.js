import resolveFields from 'routes/utils/resolveFields';

const parseRequest = (req, res, fieldNames) => {
    return {
        fields: resolveFields(req, res, fieldNames),
        createQuery: function (Creator) {
            if (this.fields) return new Creator(this.fields);
            else return { save: () => {} };
        }
    };
};

export default parseRequest;
