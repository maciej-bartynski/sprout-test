import ModuleBuilder from './servpack.module';
import log from 'util/logger';
import fs from 'fs';

const DetermineProtocol = function () {
    this.super("[SERVPACK-PROTOCOL]");

    this.__certDisabled = function (key, cert) {
        if (key === 'disabled' || cert === 'disabled')
            return true;
        return false;
    }

    this.__certSearcher = function (keyPath, cerPath) {
        let key, cer = null;
        try {
            key = fs.readFileSync(keyPath, 'utf8');
            cer = fs.readFileSync(cerPath, 'utf8');
            this.logger('Certification files found.', 'ok')
            return [cer, key]
        } catch (e) {
            this.logger(`Certification files error. ${e}`, "fail")
            return false
        }
    }

    this.__searchCertFiles = function () {
        const { config } = this.context;
        const keyPath = config.certification_key.customer;
        const cerPath = config.certification_cert.customer;
    
        const isDisabled = this.__certDisabled(keyPath, cerPath);
        if (isDisabled) {
            this.logger('Certification is disabled.', 'info')
            return false
        };
        return this.__certSearcher(keyPath, cerPath);
    };

    this.__setHttps = function (certs) {
        const { setState } = this.context;
        setState({
            protocol: "https",
            cert: certs[0],
            key: certs[1],
        });
        this.logger('Protocol is set to https.', 'ok');
    }

    this.__setHttp = function () {
        const { setState } = this.context;
        setState({
            protocol: 'http',
            key: undefined,
            cert: undefined
        });
        this.logger('Protocol is set to http', 'warn');
    }

    this.__createModule = async function () {
        const certFound = this.__searchCertFiles();
        if (certFound) this.__setHttps(certFound);
        else this.__setHttp(certFound);
    };
};

DetermineProtocol.prototype = Object.create(ModuleBuilder.prototype);
const determineProtocol = new DetermineProtocol();

export default determineProtocol;
