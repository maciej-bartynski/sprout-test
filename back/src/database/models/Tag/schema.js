import { Schema } from 'mongoose';
import { options } from 'database/models/Tag/options';
import { creator } from 'database/models/Tag/creator';
import { name } from 'database/models/Tag/name';

const schema = new Schema(creator, options);

export default {
    [name]: schema
};
