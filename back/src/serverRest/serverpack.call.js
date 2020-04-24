import servpackUseConfig from './servpackUseConfig/servpack.use';
import  _config_ from './serverpack.config.js';
import determineProtocol from './servpackModules/determineProtocol';
import determinePort from './servpackModules/determinePort';
import determineDomain from './servpackModules/determineDomain';
import determineWebaddress from './servpackModules/determineWebaddress';

async function createServerREST(config) {
    config = config ? config : _config_

    const servpack = {
        _state: Object.freeze({}),
        _config: Object.freeze({
            ...servpackUseConfig(config)
        }),
        _setState: function (payload) {
            this._state = Object.freeze({
                ...this._state,
                ...payload,
            })
        },
        get state () {
            return this._state
        },
        get config () {
            return this._config
        }
    };

    servpack.setState = servpack._setState.bind(servpack); 

    return new Promise((resolveRouter) => {
        async function recursivelyCreateAndTest() {
            try {
                await determineProtocol.create(servpack);
                await determinePort.create(servpack);
                await determineDomain.create(servpack);
                await determineWebaddress.create(servpack);            
            } catch (e) {
                log.fail(`[server-rest] ${e}.`);     
            }
        }
        resolveRouter(recursivelyCreateAndTest());
    });
}

export default createServerREST;