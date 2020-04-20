import { Schema } from 'mongoose';
import { options } from 'database/models/Category/options';
import { creator } from 'database/models/Category/creator';
import { name } from 'database/models/Category/name';

const schema = new Schema(creator, options);

export default {
    [name]: schema
};
