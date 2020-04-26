const path = require("path");
exports.usePublicpath = Object.freeze({
    static: path.join(__dirname, '../pub/static'),
    public: path.join(__dirname, '../pub/public'),
    documents: path.join(__dirname, '../pub/documents'),
});


