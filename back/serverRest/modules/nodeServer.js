const ModuleBuilder = require('./../module');

const NodeServer = function (name) {
    this.super(name)

    this.required = {
        app: undefined,
        port: undefined,
        protocol: undefined,
        key: undefined,
        cert: undefined,
    };

    this.__createServerParams = function () {
        const { required, setState } = this;

        const useCertification = required.cert() && required.key()
            ? { cert: required.cert(), key: required.key() }
            : null;

        const useParams = useCertification
            ? [useCertification, required.app()]
            : [required.app()];

        setState({
            useParams,
        })

        this.logger(`Server params created to use. Params length: ${useParams.length}.`)
    };

    this.__createServer = function () {
        const { required, state, setState } = this;

        const usePackage = required.protocol()
            ? required.protocol()
            : null;

        setState({
            server: require(usePackage).createServer(...state.useParams),
            usePackage
        });
        this.logger(`Server created with "${usePackage}" package.`);

    };


    this.__runServer = function () {
        const { required, state } = this;
        this.logger(`Server run attempt.`);
        let portingTimeout = null;
        return new Promise((res) => {
            portingTimeout = setTimeout(() => {
                this.logger(`Failure: binding port timeout. This is unhandled scenario!`, 'fail', 'info');
                res(false);
            }, 30000)

            state.server.listen(required.port(), () => {
                clearTimeout(portingTimeout);
                this.logger(`Server is listening on port: ${required.port()}.`, 'ok', 'info');
                res(true);
            });
        })
    };

    this.__setExposedValues = function () {
        const { state, setExpose } = this;
        setExpose({
            server: state.server,
            usePackage: state.usePackage
        })
    };

    this.__createModule = async function () {
        this.__createServerParams();
        this.__createServer();
        await this.__runServer();
        this.__setExposedValues();
    }
}

NodeServer.prototype = Object.create(ModuleBuilder.prototype);
const nodeServer = new NodeServer('[node-server]');
module.exports = nodeServer;