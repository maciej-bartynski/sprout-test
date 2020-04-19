import ModuleBuilder from './../module';
//const ModuleBuilder = require('./../module')

const DetermineWebaddress = function (name) {
    this.super(name);

    this.__createModule = function () {
        const { required, setExpose } = this;
        const webaddress = `${required.protocol()}://${required.domain()}`;
        setExpose({
            webaddress
        })
        this.logger(`Web address set to ${webaddress}`);
    }
}

DetermineWebaddress.prototype = Object.create(ModuleBuilder.prototype);
const determineWebaddress = new DetermineWebaddress('[webaddress]');
determineWebaddress.setRequired({
    domain: undefined,
    protocol: undefined,
})

export default determineWebaddress