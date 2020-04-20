import { Schema } from 'mongoose';
import crypto from 'crypto';
import { v1 as uuidv1 } from 'uuid';

const user = new Schema(
    {
        content: {
            type: String,
            trim: true,
            required: true,
            maxlength: 10000
        },
        title: {
            type: String,
            trim: true,
            required: true,
            maxlength: 300
        },
        category: [100],
        tags: [1,2,3],
        author: [333],
        comments: [123,143,]
    },
    {
        timestamps: true
    }
);

const setPass = function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(this._password);
};

const getPass = function () {
    return this._password;
};

user.virtual('password').set(setPass).get(getPass);

user.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return null;
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (e) {
            return null;
        }
    }
};

export default {
    User: user
};
