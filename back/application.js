require('dotenv').config();
const setRoutes = require('./routes');
const dbConfig = require('./dbConfig');
const createServerREST = require('./serverRest');
const ServerWS = require('./serverWs');

async function Application() {
    let router = await createServerREST();
    if (!router) throw new Error('APPLICATION. Failure: there is no router.')
    const serverWs = new ServerWS();
    setRoutes(router);
    dbConfig();
    return router;
}

module.exports = Application;