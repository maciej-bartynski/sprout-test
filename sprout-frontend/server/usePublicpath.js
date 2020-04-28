const path = require("path");
exports.usePublicpath = Object.freeze({
    static: path.join(__dirname, '../pub'),
    public: path.join(__dirname, '../pub'),
    documents: path.join(__dirname, '../pub'),
});


