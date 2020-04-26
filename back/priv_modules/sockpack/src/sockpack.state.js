function StateCreator(config) {
    this._connections = {};
    this.config = Object.freeze({
        ...config
    })
};

StateCreator.prototype = {
    _setConnections: function (payl) {
        this.connections[payl.id] = payl.connection;
    },
    get setConnections() {
        return this._setConnections.bind(this);
    },
    get connections() {
        return this._connections;
    },
}

export default StateCreator;