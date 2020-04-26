require('dotenv').config();
const serverPaths = require('./sprout-frontend/server');
const path = require('path');
const fs = require('fs');

const staticPath = serverPaths.usePublicpath.static;
const publicPath = serverPaths.usePublicpath.public;
const documsPath = serverPaths.usePublicpath.documents;
const buildsPath = serverPaths.useBuildspath.build;
const htmlDocPath = path.join(buildsPath, 'index.html');
const cssFilePath = path.join(buildsPath, 'index.css');
const jsBuildPath = path.join(buildsPath, 'index.js');

const Application = async () => {
    const getAppComponents = require('./back/build/build');
    const appComponents = await getAppComponents();
    const {
        router,
        setStaticContentPath,
        setPublicContentPath,
        setDocumentsContentPath,
        setBuildsContentPath
    } = appComponents;

    setStaticContentPath(staticPath);
    setPublicContentPath(publicPath);
    setDocumentsContentPath(documsPath);
    setBuildsContentPath(buildsPath);

    try {
        fs.readFileSync(cssFilePath);
        fs.readFileSync(jsBuildPath);
        fs.readFileSync(htmlDocPath);

        router.get('*', function (req, res) {
            return res.sendFile(htmlDocPath);
        });

        console.log('SERVER REST TOP. Assets found. Server will serve assets on *, /index.js, /index.css routes.')
    } catch (e) {
        console.log('SERVER REST TOP. Assets not found.')
    }
}

Application();