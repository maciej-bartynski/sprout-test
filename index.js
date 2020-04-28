require('dotenv').config();
const servpackConfig = require('./configs/servpack.config');
const sockpackConfig = require('./configs/sockpack.config');

const Application = async () => {
    const getAppComponents = require('./sprout-backend/build/build');
    await getAppComponents({ servpackConfig, sockpackConfig });
}

Application();