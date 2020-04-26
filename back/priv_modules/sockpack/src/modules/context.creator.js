function StateCreator(config) {
    this._connections = {};
    this._config = Object.freeze({
        ...config
    });
}

StateCreator.prototype = {
    _setConnections: function (payl) {
        this.connections[payl.id] = payl.connection;
    },
    set server(server) {
        this._server = server;
    },
    get setConnections() {
        return this._setConnections.bind(this);
    },
    get connections() {
        return this._connections;
    },
    get config() {
        return this._config;
    },
    get server() {
        return this._server;
    }
};

export default StateCreator;
