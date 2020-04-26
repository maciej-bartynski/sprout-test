import titles from './titles';
import contents from './contents';
import models from 'database/models';
import { name as usrName } from 'database/models/User/name';
import { name as catName } from 'database/models/Category/name';
import { name as tagName } from 'database/models/Tag/name';
import { name as artName } from 'database/models/Article/name';

export default async function seedArticles() {
    const User = models[usrName];
    const Category = models[catName];
    const Tag = models[tagName];
    const Article = models[artName];

    const usrs = await User.find({}).exec();
    const cats = await Category.find({}).exec();
    const tags = await Tag.find({}).exec();

    const iterateOverShorterArr = (demandedIdx, arr) => {
        let shorterArrIdx = 0;
        const max = arr.length ? arr.length - 1 : 0;
        for (let i = 0; i <= demandedIdx; i++) {
            shorterArrIdx = shorterArrIdx === max ? 0 : shorterArrIdx + 1;
        }
        return arr[shorterArrIdx];
    };

    let tagArrayIdx = 0;

    const data = titles.map((_, idx) => {
        const autIdx = iterateOverShorterArr(idx, usrs)._id;
        const catIdx = iterateOverShorterArr(idx, cats)._id;
        const tagId1 = iterateOverShorterArr(tagArrayIdx, tags)._id;
        const tagId2 = iterateOverShorterArr(tagArrayIdx + 1, tags)._id;
        const tagId3 = iterateOverShorterArr(tagArrayIdx + 2, tags)._id;
        tagArrayIdx += 3;

        return {
            title: titles[idx],
            content: contents[idx],
            author: autIdx,
            tags: [tagId1, tagId2, tagId3],
            category: catIdx
        };
    });

    await Article.create(data);
}
