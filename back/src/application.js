import { config } from 'dotenv';
import setRoutes from 'routes';
import dbConfig from 'dbConfig';
import createServerREST from 'serverRest';
import ServerWS from 'serverWs';
import log from 'util/logger';
import determineWebaddress from 'serverRest/modules/determineWebaddress';

config();

async function Application() {
    let router = await createServerREST();
    if (!router) throw new Error('APPLICATION. Failure: there is no router.')
    else log.frame(`Server REST available at: ${determineWebaddress.get().webaddress()}`, 'blue');
    const serverWs = new ServerWS();
    setRoutes(router);
    dbConfig();
    return router;
}

export default Application;