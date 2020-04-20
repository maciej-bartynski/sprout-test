import log from 'util/logger';

const responseWithRecordError = (e, res) => {
    const data = {
        success: false,
        msg: 'Record not received from db.'
    };

    if (!e)
        log.fail(
            '[routes/util/responseWithError] Db callback run, but data not found.'
        );

    if (e) {
        log.fail(`[routes/util/responseWithError] ${e}`);
        data.error = e;
    }

    return res.status(400).json(data);
};

export default responseWithRecordError;
