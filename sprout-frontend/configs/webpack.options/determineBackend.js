const { config } = require('dotenv');
config();
const contract = require('../../contract');

const {
    useBackendUrl: {
        http: backendHttp,
        https: backendHttps,
    }
} = contract;

const determineBackend = async (webAddress, iterator) => {

    if (iterator > 2) {
        process.env.NO_BACKEND = true;
        process.env.USE_BACKEND = "";
        process.env.USE_PROTOCOL = "";
        return undefined
    };

    return await new Promise((resolve) => {
        const protocol = webAddress.split('://')[0];
        const eConTimeout = setTimeout(() => {
            resolve(false)
        }, 30000)
        require(protocol).get(webAddress + '/test', response => {
            let data = "";
            response.on('data', (chunk) => data += chunk);
            response.on('end', () => {
                console.log('received:', data)
                clearTimeout(eConTimeout);
                resolve(protocol)
            });
            process.env.USE_BACKEND = webAddress;
            process.env.USE_PROTOCOL = protocol;
            resolve(true);
        }).on("error", (e) => {
            console.log('receiving err:', e)
            clearTimeout(eConTimeout);
            resolve(false)
        });
    }) || determineBackend(backendHttp, iterator + 1);

};

module.exports = async () => {
    const iterator = 0;
    await determineBackend(backendHttps, iterator)
};