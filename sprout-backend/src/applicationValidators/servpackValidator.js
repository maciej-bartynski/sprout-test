
import log from 'priv_modules/logger';
import servpack from 'priv_modules/servpack';

const servpackValidate = async servpackConfig => {
    const serverRestModuleAPI = await servpack(servpackConfig);
    const invalidRouter = !serverRestModuleAPI.router ? 'router' : "";
    const invalidExpApp = !serverRestModuleAPI.app ? 'app' : "";
    const invalidServer = !serverRestModuleAPI.server ? 'server' : "";
    if (invalidExpApp || invalidRouter || invalidServer) {
        const msgErr = [invalidExpApp, invalidRouter, invalidServer].filter(item => !!item).join(", ");
        log.fail(`[applicationValidators/servpackValidate] Failure: there is no: ${msgErr}.`);
        throw new Error(`[applicationValidators/servpackValidate] Application failure: there is no ${msgErr}.`);
    } else {
        log.frame(`Server REST available at: ${serverRestModuleAPI.webaddress}`, 'blue');
        return serverRestModuleAPI;
    };
}

export default servpackValidate;