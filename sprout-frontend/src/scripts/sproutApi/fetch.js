const sproutApi = async (address, params) => {
    const url = 'api/' + address;
    const mode = process.env.NODE_ENV;

    if (mode === 'watch') {
        console.log('WATCHMODE')
    }

    try {

        return await fetch(url, {
            method: params.method,
            ...params,
        }).then(response => {
            return response;
        })

    } catch (e) {
        console.log(`[sproutapi] ${e}`);
    }

}

export default sproutApi;