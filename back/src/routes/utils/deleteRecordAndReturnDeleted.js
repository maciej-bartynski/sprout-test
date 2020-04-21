import responseWithRecord from 'routes/utils/responseWithRecord';

const deleteRecordAndReturnDeleted = (name) => (req, res) => {
    req[name].remove(responseWithRecord(res));
};

export default deleteRecordAndReturnDeleted;
