import { Server as WebSocketServerConstructor } from 'ws';
import StateCreator from './sockpack.state';
import ConnectionCreator from './sockpack.connection';
import config from './../sockpack.config';

const sockpack = () => {
    
    const server = new WebSocketServerConstructor({
        port: config.port,
    });

    const state = new StateCreator(config);

    server.on('connection', (incomingConnection) => {
        new ConnectionCreator(incomingConnection).create(state);
    });

}

export default sockpack

