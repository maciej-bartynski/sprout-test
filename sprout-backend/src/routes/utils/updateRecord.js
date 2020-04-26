import responseWithRecord from 'routes/utils/responseWithRecord';

const iterationCallback = (self) => (name) => {
    if (self.fields[name] !== undefined) self.record[name] = self.fields[name];
};

const parseRequest = (req, name, fieldNames) => {
    return {
        fields: req.body,
        record: req[name],
        updateFields: function () {
            fieldNames.forEach(iterationCallback(this));
            return this.record;
        },
        responseIfNoRecord: function (res) {
            return {
                save: responseWithRecord(res)
            };
        },
        updateRecord: function (res) {
            if (this.record) return this.updateFields();
            else return this.responseIfNoRecord(res);
        }
    };
};

export default parseRequest;
