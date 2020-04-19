import ModuleBuilder from './../module';
//const ModuleBuilder = require('./../module')

const DetermineDomain = function (name) {
    this.super(name)

    this.__setDomain = function () {
        const { required, setState, state } = this;
        const { DOMAIN } = process.env;
        const localDomain = `localhost:${required.port()}`;
        const domain = DOMAIN ? DOMAIN : localDomain;
        setState({
            domain
        })
        this.logger(`Domain is set: ${state.domain}.`)
    };

    this.__setExposedValues = function () {
        const { setExpose, state } = this;
        setExpose({
            domain: state.domain
        })
    }

    this.__createModule = function () {
        this.__setDomain();
        this.__setExposedValues();
    }
}

DetermineDomain.prototype = Object.create(ModuleBuilder.prototype);
const determineDomain = new DetermineDomain('[domain]');

determineDomain.setState({
    domain: null,
});

determineDomain.setRequired({
    port: undefined,
});

determineDomain.setExpose({});

export default determineDomain;