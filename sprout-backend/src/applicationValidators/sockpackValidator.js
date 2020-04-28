
import sockpack from 'priv_modules/sockpack';
import log from 'priv_modules/logger';

const sockpackValidate = async (sockpackConfig, serverRestModuleAPI) => {
    const serverWSocModuleAPI = await sockpack({
        ...sockpackConfig,
        httpServer: serverRestModuleAPI.server
    });
    if (!serverWSocModuleAPI.socketServer) {
        log.fail(`[applicationValidators/sockpackValidate] Failure: there is no ws-server.`);
        throw new Error(`[applicationValidators/sockpackValidate] Application failure: there is no ws-server.`);
    } else {
        log.ok(`[applicationValidators/sockpackValidate] Server WS protocol compatibile with: ${serverRestModuleAPI.protocol}`);
        log.frame(`Server WS available at: ${serverRestModuleAPI.domain}`, 'blue');
        return serverWSocModuleAPI;
    };
}

export default sockpackValidate;