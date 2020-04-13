const determineProtocol = require('./modules/determineProtocol');
const determinePort = require('./modules/determinePort');
const determineDomain = require('./modules/determineDomain');
const determineWebaddress = require('./modules/determineWebaddress');
const expressApp = require('./modules/expressApp');
const nodeServer = require('./modules/nodeServer');
const testServer = require('./test/testServer');
const log = require('./../util/logger')

async function createServerREST() {
    return new Promise(resolveRouter => {
        async function recursivelyCreateAndTest(attempts = 0) {

            if (attempts >= 2) return false;
            log.strong(`[server-rest] Server creation attempt: ${attempts + 1}.`);

            try {
                await determineProtocol.create();
                await determinePort.create();
                await determineDomain.create(determinePort);
                await determineWebaddress.create(determineDomain, determineProtocol);
                await expressApp.create();
                await nodeServer.create(determineProtocol, determinePort, expressApp);
                await testServer.create(nodeServer, expressApp, determineProtocol, determineWebaddress);
            } catch (e) {
                log.fail(`[server-rest] ${e}.`);
                return recursivelyCreateAndTest(attempts + 1);
            }

            const { serverTestSuccess } = testServer.get();
            expressApp.expose.setRouterAgain();

            return serverTestSuccess()
                ? expressApp.get().router()
                : recursivelyCreateAndTest(attempts + 1);
        }

        resolveRouter(recursivelyCreateAndTest())
    })
}

module.exports = createServerREST;