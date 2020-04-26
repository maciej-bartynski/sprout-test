export const creator = Object.freeze({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: false,
        maxlength: 1000
    }
});
