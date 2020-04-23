import setRoutes from 'routes';
import database from 'database';
import createServerREST from 'serverRest';
import ServerWS from 'serverWs';
import log from 'util/logger';
import determineWebaddress from 'serverRest/modules/determineWebaddress';
import { config } from 'dotenv';
import 'colors';
config();

async function Application() {
    let exposed = await createServerREST();
    if (!exposed || !exposed.router()) throw new Error('APPLICATION. Failure: there is no router.');
    else
        log.frame(
            `Server REST available at: ${determineWebaddress
                .get()
                .webaddress()}`,
            'blue'
        );
    new ServerWS();
    setRoutes(exposed.router());
    database();
    return {
        router: exposed.router(),
        app: exposed.app()
    };
}

export default Application;
