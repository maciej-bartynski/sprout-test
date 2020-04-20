import { Schema } from 'mongoose';
import { options } from 'database/models/Article/options';
import { creator } from 'database/models/Article/creator';
import { name } from 'database/models/Article/name';

const schema = new Schema(creator, options);

export default {
    [name]: schema
};
