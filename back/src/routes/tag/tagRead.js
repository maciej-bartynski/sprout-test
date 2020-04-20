import responseWithRecord from 'routes/utils/responseWithRecord';

export default (req, res) => {
    responseWithRecord(res)(null, req.Tag);
};
