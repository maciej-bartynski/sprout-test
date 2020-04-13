const { signup, signin, signout } = require('./auth');
const { test: test_controller, path: test_path } = require('./test');

module.exports = (router) => {
    if (process.env.MODE_PRODUCTION !== 'true' && process.env.MODE_PRODUCTION !== true) router.get(test_path, test_controller);
    router.post('/api/signup', signup);
    router.post('/api/signin', signin);
    router.get('/api/signout', signout);
}