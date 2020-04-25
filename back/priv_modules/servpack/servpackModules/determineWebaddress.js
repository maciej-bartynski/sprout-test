import ModuleBuilder from './servpack.module';

const DetermineWebaddress = function () {
    this.super('[SERVERPACK-WEBADDRESS]');

    this.__createModule = function () {
        const { setState, state } = this.context;
        const webaddress = `${state.protocol}://${state.domain}`;
        setState({
            webaddress
        });
        this.logger(`Web address set to ${webaddress}`, 'ok');
    };
};

DetermineWebaddress.prototype = Object.create(ModuleBuilder.prototype);
const determineWebaddress = new DetermineWebaddress();

export default determineWebaddress;
