import responseWithRecordSuccess from 'routes/utils/responseWithRecordSuccess';
import responseWithRecordError from 'routes/utils/responseWithRecordError';

const responseWithRecord = res => (e, receivdRecord) => {
    if (e) return responseWithRecordError(e, res);
    if (!receivdRecord) return responseWithRecordError(false, res);
    return responseWithRecordSuccess(receivdRecord, res);
}

export default responseWithRecord;