import setRoutes from 'routes';
import database from 'database';
import log from 'priv_modules/logger';
import { config } from 'dotenv';
import servpack from 'priv_modules/servpack';
import sockpack from 'priv_modules/sockpack';
import useParameters from './applicationParameters';
import 'colors';
config();

const servpackValidate = serverRestModuleAPI => {
    const invalidRouter = !serverRestModuleAPI.router ? 'router' : "";
    const invalidExpApp = !serverRestModuleAPI.app ? 'app' : "";
    const invalidServer = !serverRestModuleAPI.server ? 'server' : "";
    if (invalidExpApp || invalidRouter || invalidServer) {
        const msgErr = [invalidExpApp, invalidRouter, invalidServer].filter(item => !!item).join(", ");
        log.fail(`[src/application]. Failure: there is no: ${msgErr}.`);
        throw new Error(`Application failure: there is no ${msgErr}.`);
    } else {
        log.frame(`Server REST available at: ${serverRestModuleAPI.webaddress}`, 'blue');
        return serverRestModuleAPI;
    };
}

const sockpackValidate = async (sockpackConfig, serverRestModuleAPI) => {
    const serverWSocModuleAPI = await sockpack({
        ...sockpackConfig,
        httpServer: serverRestModuleAPI.server
    });
    if (!serverWSocModuleAPI.server) {
        log.fail(`[src/application]. Failure: there is no ws-server.`);
        throw new Error(`Application failure: there is no ws-server.`);
    } else {
        log.ok(`[src/application]. Server WS protocol compatibile with: ${serverRestModuleAPI.protocol}`);
        log.frame(`Server WS available at: ${serverRestModuleAPI.domain}`, 'blue');
        return serverWSocModuleAPI;
    };
}

async function Application(applicationParams) {
    const [servpackConfig, sockpackConfig] = useParameters(applicationParams);
    try {
        const serverRestModuleAPI = servpackValidate(await servpack(servpackConfig));
        setRoutes(serverRestModuleAPI.router);
        await sockpackValidate(sockpackConfig, serverRestModuleAPI)
        database();
        return serverRestModuleAPI;
    } catch (e) {
        log.fail(`[ROOT] ${e}`);
        process.exit(1);
    }
}

export default Application;
