import ModuleBuilder from './moduleCreator';

const DetermineDomain = function () {
    this.super('[SERVPACK-DOMAIN]');

    this.__setDomain = function () {
        const { config, setState } = this.context;
        setState({
            domain: config.domain.customer
        });
        this.logger(`Domain is set: ${config.domain.customer}.`, 'ok');
    };

    this.__createModule = function () {
        this.__setDomain();
    };
};

DetermineDomain.prototype = Object.create(ModuleBuilder.prototype);
const determineDomain = new DetermineDomain();

export default determineDomain;
