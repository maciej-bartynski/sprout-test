import { Server as WebSocketServerConstructor } from 'ws';
import useConfig from './useConfig/config.validate';
import StateCreator from './modules/context.creator';
import ConnectionCreator from './modules/connect.creator';
import log from 'priv_modules/logger';

const sockpack = async (customConfig) => {
    log.strong('SOCKPACK start', 'blue');
    try {
        const mappedConfig = useConfig(customConfig);
        const wSocketState = new StateCreator(mappedConfig);

        const useHttp = !!wSocketState.config.httpServer.value;
        const usePort =
            typeof wSocketState.config.port.value === 'number' && !useHttp;
        if (!useHttp && !usePort)
            throw new Error('Something wront with ws server parameters.');
        const useParam = useHttp
            ? { server: wSocketState.config.httpServer.value }
            : { port: wSocketState.config.port.value };

        wSocketState.server = new WebSocketServerConstructor(useParam);
        wSocketState.server.on('connection', (incomingConnection) => {
            new ConnectionCreator(incomingConnection).create(wSocketState);
        });
        log.strong('SOCKPACK end', 'blue');
        return await {
            socketServer: wSocketState.server
        };
    } catch (e) {
        log.fail(`[sockpack/root] ${e}`);
        process.exit(1);
    }
};

export default sockpack;
