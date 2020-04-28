const {
    useBackendAddress: {
        backendHttp,
        backendHttps
    }
} = require(
    process.env.PROJECT_ROOT_FOR_WEBPACK + '/server'
);

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
        require(protocol).get(webAddress, response => {
            let data = "";
            response.on('data', (chunk) => data += chunk);
            response.on('end', () => {
                clearTimeout(eConTimeout);
                resolve(protocol)
            });
            process.env.USE_BACKEND = webAddress;
            process.env.USE_PROTOCOL = protocol;
            resolve(true);
        }).on("error", () => {
            clearTimeout(eConTimeout);
            resolve(false)
        });
    }) || determineBackend(backendHttp, iterator + 1);

};

module.exports = async () => {
    const iterator = 0;
    await determineBackend(backendHttps, iterator)
};