
import messageValidation from './sockpack.validator';

function ConnectionCreator(connection) {
    this.connection = connection;
    this.registered = false;
    this.id = null;
}

ConnectionCreator.prototype = {
    _createConnection: function (state) {
        this.context = state;
        this.connection.on('message', (msg) => {
            if (!this.registered) this.onRegister.bind(this)(msg);
            if (this.registered) this.onMessage.bind(this)(msg);
        });
        this.connection.on('close', this.onClose.bind(this));
    },
    get create() {
        return this._createConnection.bind(this);
    },
    onClose: function () {
        this.context.connections[this.id] = null;
        delete this.context.connections[this.id];
    },
    onRegister: function (incomMsg) {
        const msg = messageValidation(incomMsg);
        if (msg) {
            const { id } = msg;
            this.registered = true;
            this.id = id;
            this.context.setConnections({
                id: this.id,
                connection: this.connection
            });
        }
    },
    onMessage: async function (incomMsg) {
        let msg = messageValidation(incomMsg);
        if (msg) {
            const { onSend, onIncoming } = this.context.config;
            if (onIncoming) {
                msg = await onIncoming(msg, this.context.connections);
            }
            const { to } = msg;
            to.forEach(async item => {
                const connection = this.context.connections[item];
                if (connection) {
                    if (onSend) {
                        msg = await onSend(msg, this.context.connections);
                    }
                    const { body } = msg;
                    connection.send(JSON.stringify({
                        from: this.id,
                        body,
                    }))
                }
            })
        }
    }
}

export default ConnectionCreator;
