import ModuleBuilder from './servpack.module';
import express from 'express';

const TestServer = function (name) {
    this.super(name);

    this.__setTestRouting = function () {
        const { state } = this.context;
        const { webaddress, router, routerPath } = state;

        const testRoute = '/test';
        this.testAddress = webaddress + routerPath + testRoute;
        router.get(testRoute, function (_, res) {
            res.status(200).json({
                Message:
                    'If you see this message, connection to server is good.',
                Success: true
            });
        });

        this.logger(
            `Test router listens on "${this.testAddress}". Test msg will be served.`,
            'info'
        );
    };

    this.__sendTestGetReq = async function () {
        const { state } = this.context;

        return await new Promise((resolve, reject) => {
            this.logger(
                `Test start: GET ${this.testAddress}, 30sec timeout.`,
                'info'
            );
            const timeout = setTimeout(
                () => reject('Connection timeout.'),
                30000
            );
            const request = state.serverPackage;
            let received = '';
            request
                .get(this.testAddress, (response) => {
                    response.on('data', (chunk) => (received += chunk));
                    response.on('end', () => {
                        clearTimeout(timeout);
                        this.logger(
                            `GET ${this.testAddress}, response: ${received}`,
                            'ok'
                        );
                        resolve(true);
                    });
                })
                .on('error', (e) => {
                    this.logger(`GET ${this.testAddress}, error: ${e}`, 'fail');
                    clearTimeout(timeout);
                    reject(e);
                });
        });
    };

    this.__deleteTestRouter = async function () {
        const { setState } = this.context;
        setState({
            router: express.Router(),
            flagged: '31'
        });
    };

    this.__createModule = async function () {
        await this.__setTestRouting();
        await this.__sendTestGetReq();
        this.__deleteTestRouter();
    };
};

TestServer.prototype = Object.create(ModuleBuilder.prototype);
const testServer = new TestServer('[test-server]');

export default testServer;
