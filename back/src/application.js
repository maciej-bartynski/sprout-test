import setRoutes from 'routes';
import database from 'database';
import createServerREST from 'serverRest';
import ServerWS from 'serverWs';
import log from 'util/logger';
import determineWebaddress from 'serverRest/modules/determineWebaddress';
import { config } from 'dotenv';
import 'colors';
config();

const fail = (componentName) => {
    log.fail(`[src/application]. Failure: there is no ${componentName}.`);
    throw new Error(`Application failure: there is no ${componentName}.`);
};

const success = () => {
    log.frame(
        `Server REST available at: ${determineWebaddress.get().webaddress()}`,
        'blue'
    );
};

async function Application() {
    const serverRestModuleAPI = await createServerREST();
    const components = Object.freeze({
        router: serverRestModuleAPI.router(),
        app: serverRestModuleAPI.app(),
        setStaticContentPath: serverRestModuleAPI.setStaticContentPath,
        setPublicContentPath: serverRestModuleAPI.setPublicContentPath,
        setDocumentsContentPath: serverRestModuleAPI.setDocumentsContentPath,
        setBuildsContentPath: serverRestModuleAPI.setBuildsContentPath
    });
    if (!components.router) fail('router');
    if (!components.app) fail('app');
    success();
    setRoutes(components.router);
    database();
    new ServerWS();
    return components;
}

export default Application;
