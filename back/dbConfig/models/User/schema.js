const { Schema } = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

const user = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    hashed_password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true,
        default: "Another broken soul."
    },
    salt: String
}, {
    timestamps: true
})

const setPass = function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(this._password);
}

const getPass = function () {
    return this._password;
}

user.virtual('password')
    .set(setPass)
    .get(getPass);

user.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    }, 
    encryptPassword: function (password) {
        if (!password) return null;
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (e) {
            return null;
        }
    }
}

module.exports = {
    'User': user,
}