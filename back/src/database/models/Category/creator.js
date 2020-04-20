export const creator = Object.freeze({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
        required: false,
        maxlength: 1000
    },
})