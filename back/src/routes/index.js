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
    categoryDelete
} = category;

const { articleCreate, articleUpdate, articleRead, articleDelete } = article;

const { tagCreate, tagUpdate, tagRead, tagDelete } = tag;

const { commentCreate, commentUpdate, commentRead, commentDelete } = comment;

const { test: test_controller, path: test_path } = test;

const routes = (router) => {
    if (process.env.IS_PRODUCTION === 'false')
        router.get(test_path, test_controller);

    router.post('/api/signup', signup);
    router.post('/api/signin', signin);
    router.get('/api/signout', signout);

    router.post('/api/category/create', checkRequestAuthcookie, categoryCreate);
    router.get('/api/category/read', categoryRead);
    router.put('/api/category/update', checkRequestAuthcookie, categoryUpdate);
    router.delete(
        '/api/category/delete',
        checkRequestAuthcookie,
        categoryDelete
    );

    router.post('/api/article/create', checkRequestAuthcookie, articleCreate);
    router.get('/api/article/read', articleRead);
    router.put('/api/article/update', checkRequestAuthcookie, articleUpdate);
    router.delete('/api/article/delete', checkRequestAuthcookie, articleDelete);

    router.post('/api/tag/create', checkRequestAuthcookie, tagCreate);
    router.get('/api/tag/read', tagRead);
    router.put('/api/tag/update', checkRequestAuthcookie, tagUpdate);
    router.delete('/api/tag/delete', checkRequestAuthcookie, tagDelete);

    router.post('/api/comment/create', checkRequestAuthcookie, commentCreate);
    router.get('/api/comment/read', commentRead);
    router.put('/api/comment/update', checkRequestAuthcookie, commentUpdate);
    router.delete('/api/comment/delete', checkRequestAuthcookie, commentDelete);
};

export default routes;
