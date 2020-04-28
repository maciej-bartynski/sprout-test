import setRoutes from 'routes';
import database from 'database';
import log from 'priv_modules/logger';
import { config } from 'dotenv';
import applicationValidator from 'applicationValidators';
import 'colors';
config();

async function Application(applicationParams) {
    const { servpackConfig, sockpackConfig } = applicationParams;
    try {
        const applicationAPI = await applicationValidator(servpackConfig, sockpackConfig);
        database();
        setRoutes(applicationAPI.router);
        return applicationAPI;
    } catch (e) {
        log.fail(`[ROOT] ${e}`);
        process.exit(1);
    }
}

export default Application;
