import ModuleBuilder from './../module';
//const ModuleBuilder = require('./../module')

const DeterminePort = function (name) {
    this.super(name);

    this.__setPort = function () {
        const { PORT } = process.env;
        const port = PORT || 5000;
        this.setState({
            port,
        })
        this.logger(`Port determined: ${this.state.port}`);
    }

    this.__setExposedValues = function () {
        const { state, setExpose } = this;
        setExpose({
            port: state.port,
        })
    }

    this.__createModule = function () {
        this.__setPort();
        this.__setExposedValues();
    }
}

DeterminePort.prototype = Object.create(ModuleBuilder.prototype)
const determinePort = new DeterminePort('[port]');
export default determinePort