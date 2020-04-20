export const creator = Object.freeze({
    tag: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
        unique: true
    }
});
