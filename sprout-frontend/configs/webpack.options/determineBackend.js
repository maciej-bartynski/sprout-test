const axios = require('axios');
const urlExist = require('url-exist');
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

    let success = await urlExist(webAddress + "/test");
    if (success) {
        const protocol = webAddress.split('://')[0];
        process.env.USE_BACKEND = webAddress;
        process.env.USE_PROTOCOL = protocol;
    } else {
        await determineBackend(backendHttp, iterator + 1);
    }
};

module.exports = async () => {
    const iterator = 0;
    await determineBackend(backendHttps, iterator)
};