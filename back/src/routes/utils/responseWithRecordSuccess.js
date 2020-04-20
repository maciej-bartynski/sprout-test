const responseWithRecordSuccess = (receivdRecord, res) => {
    return res.status(200).json({
        success: true,
        msg: 'Record received from db.',
        data: receivdRecord
    });
};

export default responseWithRecordSuccess