import auth from './auth';
import test from './test';

const { signup, signin, signout } = auth;
const { test: test_controller, path: test_path } = test;

const routes = (router) => {
    if (process.env.IS_PRODUCTION === 'false') router.get(test_path, test_controller);
    router.post('/api/signup', signup);
    router.post('/api/signin', signin);
    router.get('/api/signout', signout);
}

export default routes