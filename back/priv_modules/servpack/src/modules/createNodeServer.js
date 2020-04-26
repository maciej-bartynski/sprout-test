import ModuleBuilder from './moduleCreator';
const http = require('http');
const https = require('https');

const NodeServer = function (name) {
    this.super(name);

    this.__createServerParams = function () {
        const { config, state, setState } = this.context;
        const {
            certification_key: { customer: k },
            certification_cert: { customer: c }
        } = config;

        const useCertification = c && k ? { cert: c, key: k } : null;

        const useParams = useCertification
            ? [useCertification, state.app]
            : [state.app];

        setState({
            serverParams: useParams
        });

        this.logger(
            `Server params created. Params length: ${useParams.length}.`,
            'info'
        );
    };

    this.__createServerPackage = function () {
        const { config, setState } = this.context;
        const { customer } = config.protocol;

        const allowedServerPackages = {
            http,
            https
        };

        const usePackage = allowedServerPackages[customer];

        setState({
            serverPackage: usePackage
        });

        this.logger(
            `Server package determined: "${customer}" package.`,
            'info'
        );
    };

    this.__createServer = function () {
        const { state, setState } = this.context;
        try {
            const server = state.serverPackage.createServer(
                ...state.serverParams
            );
            setState({
                server
            });
        } catch (E) {
            this.logger(`"${E}"`, 'fail');
        }
        this.logger(`Server created.`, 'info');
    };

    this.__runServer = function () {
        const { state } = this.context;
        this.logger('Server run attempt. 30sec for trying is given.', 'info');

        let portingTimeout = null;

        return new Promise((res) => {
            portingTimeout = setTimeout(() => {
                this.logger(
                    'Binding port timeout. Unhandled scenario!',
                    'fail'
                );
                res(false);
            }, 30000);

            state.server.listen(state.port, () => {
                clearTimeout(portingTimeout);
                this.logger(
                    `Server is listening on port: ${state.port}.`,
                    'ok'
                );
                res(true);
            });
        });
    };

    this.__createModule = async function () {
        this.__createServerParams();
        this.__createServerPackage();
        this.__createServer();
        await this.__runServer();
    };
};

NodeServer.prototype = Object.create(ModuleBuilder.prototype);
const nodeServer = new NodeServer('[node-server]');
export default nodeServer;
