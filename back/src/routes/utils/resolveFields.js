const resolveFields = (req, fieldNames = []) => {
    const { body } = req;
    const found = {};
    const callback = field =>
        fieldNames.includes(field) && (found[field] = body[field]);
    Object.keys(body).forEach(callback);
    return (fieldNames.length && found) || body;
}

export default resolveFields;