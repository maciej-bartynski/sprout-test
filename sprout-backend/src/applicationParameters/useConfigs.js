// import servpackConfig from './servpack.config';
// import sockpackConfig from './sockpack.config';
import log from 'priv_modules/logger';

const useParameters = async (applicationParameters = {}) => {
    const { extServ = {}, extSock = {} } = applicationParameters;

    let servpackConfig = {}; //from './servpack.config';
    let sockpackConfig = {}; //from './sockpack.config';

    if (process.env.ROLLUP_OPTIONS = 'dev') {
        try {
            servpackConfig = await import("./servpack.config");
            sockpackConfig = await import("./sockpack.config");
        } catch (e) {
            log.warn(`[applicationParameters/useConfigs] ${e}`);
        }   
    }

    const servConf = {
        ...servpackConfig,
        ...extServ,
    };
    const sockConf = {
        ...sockpackConfig,
        ...extSock,
    };
    return [servConf, sockConf];
}

export default useParameters;