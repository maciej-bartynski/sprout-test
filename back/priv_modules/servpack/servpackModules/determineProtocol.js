import ModuleBuilder from './servpack.module';

const DetermineProtocol = function () {
    this.super('[SERVPACK-PROTOCOL]');

    this.__handleCertFiles = function () {
        const { config } = this.context;
        const key = config.certification_key.customer;
        const cer = config.certification_cert.customer;
        const isDisabled = key === 'disabled' || cer === 'disabled';
        if (isDisabled) {
            this.logger('Certification is disabled.', 'info');
            return false;
        } else {
            return [cer, key];
        }
    };

    this.__setHttps = function (certs) {
        const { setState } = this.context;
        setState({
            protocol: 'https',
            cert: certs[0],
            key: certs[1],
            flagged: '1'
        });
        this.logger('Protocol is set to https.', 'ok');
    };

    this.__setHttp = function () {
        const { setState } = this.context;
        setState({
            protocol: 'http',
            key: undefined,
            cert: undefined,
            flagged: '12'
        });
        this.logger('Protocol is set to http', 'warn');
    };

    this.__createModule = async function () {
        const certFound = this.__handleCertFiles();
        if (certFound) this.__setHttps(certFound);
        else this.__setHttp(certFound);
    };
};

DetermineProtocol.prototype = Object.create(ModuleBuilder.prototype);
const determineProtocol = new DetermineProtocol();

export default determineProtocol;
