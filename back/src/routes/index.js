import auth from './auth';
import test from './test';
import category from './category';

const { signup, signin, signout, checkRequestAuthcookie } = auth;

const {
    categoryCreate,
    categoryUpdate,
    categoryRead,
    categoryDelete
} = category;

const { test: test_controller, path: test_path } = test;

const routes = (router) => {
    if (process.env.IS_PRODUCTION === 'false')
        router.get(test_path, test_controller);

    router.post('/api/signup', signup);
    router.post('/api/signin', signin);
    router.get('/api/signout', signout);

    router.post('/api/category/create', checkRequestAuthcookie, categoryCreate);
    router.get('/api/category/read', categoryRead);
    router.put('/api/category/update', categoryUpdate);
    router.delete('/api/category/delete', categoryDelete);
};

export default routes;
