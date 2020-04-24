import ModuleBuilder from './servpack.module';

const DeterminePort = function () {
    this.super("[SERVERPACK-PORT]");

    this.__setPort = function () {
        const { config, setState } = this.context;
        const { port } = config;
        setState({
            port: port.customer
        });
        this.logger(`Port determined: ${port.customer}`, 'ok');
    };

    this.__createModule = function () {
        this.__setPort();
    };
};

DeterminePort.prototype = Object.create(ModuleBuilder.prototype);
const determinePort = new DeterminePort();
export default determinePort;
