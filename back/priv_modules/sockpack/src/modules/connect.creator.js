import messageValidation from './message.validator';
import log from 'priv_modules/logger';

function ConnectionCreator(connection) {
    this.connection = connection;
    this.registered = false;
    this.id = null;
}

ConnectionCreator.prototype = {
    onClose: function () {
        try {
            this.context.connections[this.id] = null;
            delete this.context.connections[this.id];
        } catch (e) {
            log.fail(`[sockpack/close] ${e}`);
        }
    },
    onRegister: function (incomMsg) {
        try {
            const { value: onRegister } = this.context.config.onRegister;
            const msg = messageValidation(incomMsg);
            const { id } = msg;
            this.registered = true;
            this.id = id;
            const params = {
                id: this.id,
                connection: {
                    send: this.send.bind(this),
                    _id: this.id,
                    _createdAt: new Date().getTime(),
                    _connection: this.connection
                }
            };
            this.context.setConnections(params);
            onRegister(msg, this.context.connections);
        } catch (e) {
            log.fail(`[sockpack/register] ${e}`);
        }
    },
    onMessage: async function (incomMsg) {
        try {
            const { value: onMessage } = this.context.config.onMessage;
            const msg = messageValidation(incomMsg);
            onMessage(msg, this.context.connections);
        } catch (e) {
            log.fail(`[sockpack/message] ${e}`);
        }
    },
    send: function (from, body) {
        try {
            this.connection.send(
                JSON.stringify({
                    from,
                    body,
                    createdAt: new Date().getTime()
                })
            );
        } catch (e) {
            log.fail(`[sockpack/send] ${e}`);
        }
    },
    createConnection: function (state) {
        try {
            this.context = state;
            const { value: onOpen } = this.context.config.onOpen;
            this.connection.on('message', (msg) => {
                if (!this.registered) this.onRegister.bind(this)(msg);
                else this.onMessage.bind(this)(msg);
            });
            this.connection.on('close', this.onClose.bind(this));
            onOpen(this.context.connections, this.connection);
        } catch (e) {
            log.fail(`[sockpack/create] ${e}`);
        }
    },
    get create() {
        return this.createConnection.bind(this);
    }
};

export default ConnectionCreator;
