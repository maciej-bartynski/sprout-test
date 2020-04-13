require('dotenv').config();
const setRoutes = require('./routes');
const dbConfig = require('./dbConfig');
const createServerREST = require('./serverRest');
const ServerWS = require('./serverWs');
const log = require('./util/logger');
const determineWebaddress = require('./serverRest/modules/determineWebaddress');

async function Application() {
    let router = await createServerREST();
    if (!router) throw new Error('APPLICATION. Failure: there is no router.')
    else log.frame(`Server REST available at: ${determineWebaddress.get().webaddress()}`, 'blue');
    const serverWs = new ServerWS();
    setRoutes(router);
    dbConfig();
    return router;
}

module.exports = Application;