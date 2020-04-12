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

        try {
            setState({
                server: require(usePackage).createServer(...state.useParams),
                usePackage
            });
            this.logger(`Server created with "${usePackage}" package.`);
        } catch (e) {
            this.logger(`Server creation failed. ${e}`)
        }
    };


    this.__runServer = function () {
        const { required, state } = this;
        this.logger(`Server run attempt.`);
        let portingTimeout = null;
        return new Promise((res) => {
            portingTimeout = setTimeout(() => {
                this.logger(`Failure: binding port timeout. This is unhandled scenario!`);
                res(false);
            }, 30000)

            try {
                state.server.listen(required.port(), () => {
                    clearTimeout(portingTimeout);
                    this.logger(`Server is listening on port: ${required.port()}.`);
                    res(true);
                });
            } catch (e) {
                this.logger(`Failure during server listen attempt: ${e}.`)
                clearTimeout(portingTimeout);
                res(false);
            }
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
const nodeServer = new NodeServer('NODE-SERVER');
module.exports = nodeServer;