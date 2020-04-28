require('dotenv').config();
const servpackConfig = require('./applicationParameters/servpack.config');
const sockpackConfig = require('./applicationParameters/sockpack.config');

const Application = async () => {
    const getAppComponents = require('./sprout-backend/build/build');
    await getAppComponents({ servpackConfig, sockpackConfig });
}

Application();