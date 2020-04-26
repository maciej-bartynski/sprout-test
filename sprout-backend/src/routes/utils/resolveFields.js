function Found(data, required) {
    this.data = data;
    this.missing = [];
    this.success = true;
    this.required = [...required];
    this.errorMsg = null;
}

Found.prototype.checkFields = function () {
    this.required.forEach((name) => {
        if (this.data[name] !== undefined) return;
        this.success = false;
        this.missing.push(name);
    });
};

Found.prototype.setErrorMsg = function () {
    if (!this.success)
        this.errorMsg = `Missing fields: ${this.missing.join(', ')}.`;
};

Found.prototype.handleMissingData = function (res) {
    const self = this;
    return res.status(400).json({
        success: false,
        msg: self.errorMsg
    });
};

const resolveFields = (req, res, required, callback) => {
    const found = new Found(req.body, required);
    found.checkFields();
    found.setErrorMsg();
    if (callback) return callback(found);
    if (!found.success) found.handleMissingData(res);
    else return found.data;
};

export default resolveFields;
