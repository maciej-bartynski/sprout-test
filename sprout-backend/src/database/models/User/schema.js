import { Schema } from 'mongoose';
import crypto from 'crypto';
import { v1 as uuidv1 } from 'uuid';
import { options } from 'database/models/User/options';
import { creator } from 'database/models/User/creator';
import { name } from 'database/models/User/name';

const schema = new Schema(creator, options);

const setPass = function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(this._password);
};

const getPass = function () {
    return this._password;
};

schema.virtual('password').set(setPass).get(getPass);

schema.methods = {
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
    [name]: schema
};
