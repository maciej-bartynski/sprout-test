require('dotenv').config();
const path = require('path');
const fs = require('fs');

const Application = async () => {
    const router = await require('./back/application')();
    const htmlFilePath = path.join(__dirname, 'frontTest', 'index.html');
    const cssFilePath = path.join(__dirname, 'frontTest', 'index.css');
    const jsFilePath = path.join(__dirname, 'frontTest', 'index.js');
    try {
        const cssFile = fs.readFileSync(cssFilePath);
        const jsFile = fs.readFileSync(jsFilePath);
        const htmlFile = fs.readFileSync(htmlFilePath);
        if (cssFile && jsFile && htmlFile) {
            router.get('/index.js', function (req, res) {
                res.sendFile(jsFilePath);
            });
            router.get('/index.css', function (req, res) {
                res.sendFile(cssFilePath);
            });
            router.get('*', function (req, res) {
                return res.sendFile(htmlFilePath);
            });
        }
        console.log('SERVER REST TOP. Assets found. Server will serve assets on *, /index.js, /index.css routes.')
    } catch (e) {
        console.log('SERVER REST TOP. Assets not found.')
    }
}

Application();