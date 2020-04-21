import names from './names';
import descriptions from './descriptions';
import models from 'database/models';
import { name as catName } from 'database/models/Category/name';

export default async function seedArticles() {
    const CategoryModel = models[catName];

    const data = names.map((_, idx) => {
        return {
            name: names[idx],
            description: descriptions[idx]
        };
    });

    await CategoryModel.create(data);
}
