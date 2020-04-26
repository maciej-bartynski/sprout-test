import { Server as WebSocketServerConstructor } from 'ws';
import useConfig from './useConfig/config.validate';
import StateCreator from './modules/context.creator';
import ConnectionCreator from './modules/connect.creator';
import log from 'priv_modules/logger';

const sockpack = (customConfig) => {
    log.section('[SOCKPACK]');
    try {
        const mappedConfig = useConfig(customConfig);
        const wSocketState = new StateCreator(mappedConfig);
        wSocketState.server = new WebSocketServerConstructor({
            port: wSocketState.config.port.value
        });
        wSocketState.server.on('connection', (incomingConnection) => {
            new ConnectionCreator(incomingConnection).create(wSocketState);
        });
        log.endsec('[SOCKPACK]');
        return {
            server: wSocketState.server
        };
    } catch (e) {
        log.fail(`[sockpack/root] ${e}`);
        process.exit(1);
    }
};

export default sockpack;
