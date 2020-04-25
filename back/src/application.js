import setRoutes from 'routes';
import database from 'database';
import ServerWS from 'serverWs';
import log from 'priv_modules/logger';
import { config } from 'dotenv';
import servpack from 'priv_modules/servpack';
import servpackConfig from 'configs/serverpack.config';
import 'colors';
config();

const fail = (componentName) => {
    log.fail(`[src/application]. Failure: there is no ${componentName}.`);
    throw new Error(`Application failure: there is no ${componentName}.`);
};

const success = (webaddress) => {
    log.frame(`Server REST available at: ${webaddress}`, 'blue');
};

async function Application() {
    const serverRestModuleAPI = await servpack(servpackConfig);
    if (!serverRestModuleAPI.router) fail('router');
    if (!serverRestModuleAPI.app) fail('app');
    success(serverRestModuleAPI.webaddress);
    setRoutes(serverRestModuleAPI.router);
    database();
    new ServerWS();
    return serverRestModuleAPI;
}

export default Application;
