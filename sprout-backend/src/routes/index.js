import auth from './auth';
import test from './test';
import category from './category';
import article from './article';
import tag from './tag';
import comment from './comment';
import user from './user';

const {
    signup,
    signin,
    signout,
    checkRequestAuthcookie,
    isUserAuthorised
} = auth;
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
const { userUpdate, userRead, userReadAll, getUser } = user;
const { test: test_controller, path: test_path } = test;

const routes = (router) => {
    /** 
     * Test puroposes path */
    router.get(test_path, test_controller);
    /** */

    router.post('/signup', signup);
    router.post('/signin', signin);
    router.get('/signout', signout);

    router.get('/user/read/:userId', userRead);
    router.get('/user/read-all', userReadAll);
    router.put(
        '/user/update/:userId',
        checkRequestAuthcookie,
        isUserAuthorised,
        userUpdate
    );
    router.param('userId', getUser);

    router.post('/category/create', checkRequestAuthcookie, categoryCreate);
    router.get('/category/read/:categoryId', categoryRead);
    router.get('/category/read-all', categoryReadAll);
    router.put(
        '/category/update/:categoryId',
        checkRequestAuthcookie,
        categoryUpdate
    );
    router.delete(
        '/category/delete/:categoryId',
        checkRequestAuthcookie,
        categoryDelete
    );
    router.param('categoryId', getCategory);

    router.post('/article/create', checkRequestAuthcookie, articleCreate);
    router.get('/article/read/:articleId', articleRead);
    router.put(
        '/article/update/:articleId',
        checkRequestAuthcookie,
        articleUpdate
    );
    router.delete(
        '/article/delete/:articleId',
        checkRequestAuthcookie,
        articleDelete
    );
    router.param('articleId', getArticle);

    router.post('/tag/create', checkRequestAuthcookie, tagCreate);
    router.get('/tag/read/:tagId', tagRead);
    router.put('/tag/update/:tagId', checkRequestAuthcookie, tagUpdate);
    router.delete('/tag/delete/:tagId', checkRequestAuthcookie, tagDelete);
    router.param('tagId', getTag);

    router.post('/comment/create', checkRequestAuthcookie, commentCreate);
    router.get('/comment/read/:commentId', commentRead);
    router.put(
        '/comment/update/:commentId',
        checkRequestAuthcookie,
        commentUpdate
    );
    router.delete(
        '/comment/delete/:commentId',
        checkRequestAuthcookie,
        commentDelete
    );
    router.param('commentId', getComment);
};

export default routes;
