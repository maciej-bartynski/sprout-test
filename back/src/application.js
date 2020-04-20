import setRoutes from 'routes';
import database from 'database';
import createServerREST from 'serverRest';
import ServerWS from 'serverWs';
import log from 'util/logger';
import determineWebaddress from 'serverRest/modules/determineWebaddress';

async function Application() {
    let router = await createServerREST();
    if (!router) throw new Error('APPLICATION. Failure: there is no router.');
    else
        log.frame(
            `Server REST available at: ${determineWebaddress
                .get()
                .webaddress()}`,
            'blue'
        );
    new ServerWS();
    setRoutes(router);
    database();
    return router;
}

module.exports = Application;
export default Application;
