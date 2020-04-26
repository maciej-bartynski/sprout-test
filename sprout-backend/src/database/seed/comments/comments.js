import titles from './titles';
import contents from './contents';
import models from 'database/models';
import { name as artName } from 'database/models/Article/name';
import { name as comName } from 'database/models/Comment/name';

export default async function seedComments() {
    const ArticleModel = models[artName];
    const CommentModel = models[comName];
    const articles = await ArticleModel.find({}).exec();

    const iterateOverShorterArr = (demandedIdx, arr) => {
        let shorterArrIdx = 0;
        const max = arr.length - 1;
        for (let i = 0; i <= demandedIdx; i++) {
            shorterArrIdx = shorterArrIdx === max ? 0 : shorterArrIdx + 1;
        }
        return arr[shorterArrIdx];
    };

    const data = titles.map((_, idx) => {
        const artIdx = iterateOverShorterArr(idx, articles)._id;
        return {
            title: titles[idx],
            content: contents[idx],
            article: artIdx
        };
    });

    await CommentModel.create(data);
}
