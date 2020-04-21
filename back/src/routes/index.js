import auth from './auth';
import test from './test';
import category from './category';
import article from './article';
import tag from './tag';
import comment from './comment';

const { signup, signin, signout, checkRequestAuthcookie } = auth;
const {
    categoryCreate,
    categoryUpdate,
    categoryRead,
    categoryReadAll,
    categoryDelete,
    getCategory
} = category;
const {
    articleCreate,
    articleUpdate,
    articleRead,
    articleDelete,
    getArticle
} = article;
const { tagCreate, tagUpdate, tagRead, tagDelete, getTag } = tag;
const {
    commentCreate,
    commentUpdate,
    commentRead,
    commentDelete,
    getComment
} = comment;
const { test: test_controller, path: test_path } = test;

const routes = (router) => {
    if (process.env.IS_PRODUCTION === 'false')
        router.get(test_path, test_controller);

    router.post('/api/signup', signup);
    router.post('/api/signin', signin);
    router.get('/api/signout', signout);

    router.post('/api/category/create', checkRequestAuthcookie, categoryCreate);
    router.get('/api/category/read/:categoryId', categoryRead);
    router.get('/api/category/read-all', categoryReadAll);
    router.put(
        '/api/category/update/:categoryId',
        checkRequestAuthcookie,
        categoryUpdate
    );
    router.delete(
        '/api/category/delete/:categoryId',
        checkRequestAuthcookie,
        categoryDelete
    );
    router.param('categoryId', getCategory);

    router.post('/api/article/create', checkRequestAuthcookie, articleCreate);
    router.get('/api/article/read/:articleId', articleRead);
    router.put(
        '/api/article/update/:articleId',
        checkRequestAuthcookie,
        articleUpdate
    );
    router.delete(
        '/api/article/delete/:articleId',
        checkRequestAuthcookie,
        articleDelete
    );
    router.param('articleId', getArticle);

    router.post('/api/tag/create', checkRequestAuthcookie, tagCreate);
    router.get('/api/tag/read/:tagId', tagRead);
    router.put('/api/tag/update/:tagId', checkRequestAuthcookie, tagUpdate);
    router.delete('/api/tag/delete/:tagId', checkRequestAuthcookie, tagDelete);
    router.param('tagId', getTag);

    router.post('/api/comment/create', checkRequestAuthcookie, commentCreate);
    router.get('/api/comment/read/:commentId', commentRead);
    router.put(
        '/api/comment/update/:commentId',
        checkRequestAuthcookie,
        commentUpdate
    );
    router.delete(
        '/api/comment/delete/:commentId',
        checkRequestAuthcookie,
        commentDelete
    );
    router.param('commentId', getComment);
};

export default routes;
