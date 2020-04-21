import names from './names';
import models from 'database/models';
import { name as tagName } from 'database/models/Tag/name';

export default async function seedTags() {
    const TagModel = models[tagName];

    const data = names.map((tagname) => {
        return {
            tag: tagname
        };
    });

    await TagModel.create(data);
}
