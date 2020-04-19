import ModuleBuilder from './../module';
import path from 'path';
import fs from 'fs';

const DetermineProtocol = function (name) {
    this.super(name);

    this.__whenForceHttp = function () {
        this.setState({
            protocol: "http",
            cert: null,
            key: null,
        })
        this.logger(`Protocol is forced to be set to http.`, 'warn', 'info');
    }

    this.__whenCertificationFound = function (cert, key) {
        this.setState({
            protocol: "https",
            cert,
            key,
        })
        this.logger(`Files considered as certification found. Protocol is set to https.`, 'ok', 'info');
    }

    this.__whenCertificationNotFound = function () {
        this.setState({
            protocol: "http",
            cert: null,
            key: null,
            forceHttp: true,
        })
        this.logger(`Files considered as certification not found. Protocol is set to http.`)
    }

    this.__setProtocol = function () {
        const { state, setState } = this;

        setState({
            cert: null,
            key: null,
            forceHttp: state.attempts >= 1,
        })

        if (state.forceHttp) {
            this.__whenForceHttp();
            return;
        }

        const { CERTIFICATE_FILE, PRIVATE_KEY_FILE } = process.env;
        
        let key, cert = null;

        try {
            key = fs.readFileSync(path.join(__dirname, '../cert', PRIVATE_KEY_FILE), "utf8");
            cert = fs.readFileSync(path.join(__dirname, '../cert', CERTIFICATE_FILE), "utf8");
        } catch { 
            this.logger(`Cannot read certification files. Protocol is set to http.`, 'warn', 'info');
        }
                
        if (key && cert) this.__whenCertificationFound(cert, key);
        else this.__whenCertificationNotFound();
    };

    this.__setAttempts = function () {
        const { setState, state } = this;
        setState({
            attempts: state.attempts + 1
        })
    };

    this.__setExposedValues = function () {
        const { setExpose, state } = this;
        setExpose({
            protocol: state.protocol,
            cert: state.cert,
            key: state.key,
        })
    }

    this.__createModule = function () {
        this.__setProtocol();
        this.__setAttempts();
        this.__setExposedValues();
    }
}

DetermineProtocol.prototype = Object.create(ModuleBuilder.prototype);
const determineProtocol = new DetermineProtocol('[protocol]');

determineProtocol.setState({
    protocol: "",
    cert: null,
    key: null,
    forceHttp: false,
    attempts: 0,
})

export default determineProtocol;