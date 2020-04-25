import servpackUseConfig from './servpackUseConfig/servpack.use';
import determineProtocol from './servpackModules/determineProtocol';
import determinePort from './servpackModules/determinePort';
import determineDomain from './servpackModules/determineDomain';
import determineWebaddress from './servpackModules/determineWebaddress';
import expressApp from './servpackModules/expressApp';
import nodeServer from './servpackModules/nodeServer';
import testServer from './servpackModules/testServer';
import log from 'priv_modules/logger';

async function createServerREST(config) {
    let mappedConfig = null;

    try {
        mappedConfig = servpackUseConfig(config);
    } catch (e) {
        log.fail(e);
        process.exit(1);
    }

    const servpack = {
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

    servpack.setState = servpack._setState.bind(servpack);

    try {
        await determineProtocol.create(servpack);
        await determinePort.create(servpack);
        await determineDomain.create(servpack);
        await determineWebaddress.create(servpack);
        await expressApp.create(servpack);
        await nodeServer.create(servpack);
        await testServer.create(servpack);
        log.ok(`[servpack] All modules build.`);
        return servpack.state;
    } catch (e) {
        log.fail(`[servpack] ${e}.`);
        throw new Error(e);
    }
}

export default createServerREST;
