const Application = async () => {
    const path = require('path');
    const rootPath = __dirname;
    const frontendPath = path.resolve(rootPath, "sprout-frontend");
    const backendPath = path.resolve(rootPath, "sprout-backend");
    const paramsPath = rootPath + '/applicationParameters';
    const servpackConfig = require(paramsPath + '/servpack.config')(rootPath, frontendPath, backendPath);
    const sockpackConfig = require(paramsPath + '/sockpack.config');

    const getAppComponents = require(backendPath + '/build/build');
    await getAppComponents({ servpackConfig, sockpackConfig });
}

Application();