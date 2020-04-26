import { Schema } from 'mongoose';
import { options } from 'database/models/Comment/options';
import { creator } from 'database/models/Comment/creator';
import { name } from 'database/models/Comment/name';

const schema = new Schema(creator, options);

export default {
    [name]: schema
};
