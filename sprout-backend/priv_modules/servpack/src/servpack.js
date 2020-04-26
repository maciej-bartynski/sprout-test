import useConfig from './useConfig/config.use';
import determineProtocol from './modules/determineProtocol';
import determinePort from './modules/determinePort';
import determineDomain from './modules/determineDomain';
import determineWebaddress from './modules/determineWebaddress';
import expressApp from './modules/createExpressApp';
import nodeServer from './modules/createNodeServer';
import testServer from './modules/createTestServer';
import log from 'priv_modules/logger';

async function servpack(config) {
    log.strong('SERVPACK start', 'blue');
    let mappedConfig = null;

    try {
        mappedConfig = useConfig(config);
    } catch (e) {
        log.fail(e);
        process.exit(1);
    }

    const context = {
        _state: Object.freeze({}),
        _config: Object.freeze({
            ...mappedConfig
        }),
        _setState: function (payload) {
            this._state = Object.freeze({
                ...this._state,
                ...payload
            });
        },
        get state() {
            return this._state;
        },
        get config() {
            return this._config;
        }
    };

    context.setState = context._setState.bind(context);

    try {
        await determineProtocol.create(context);
        await determinePort.create(context);
        await determineDomain.create(context);
        await determineWebaddress.create(context);
        await expressApp.create(context);
        await nodeServer.create(context);
        await testServer.create(context);
        log.ok(`[servpack/root] All modules build.`);
        log.strong('SERVPACK end', 'blue');
        return context.state;
    } catch (e) {
        log.fail(`[servpack/root] ${e}.`);
        throw new Error(e);
    }
}

export default servpack;
