import ModuleBuilder from './moduleCreator';
import express from 'express';
import axios from 'axios';

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
        await axios.get(this.testAddress)
            .then((response) => {
                this.logger(
                    `GET ${this.testAddress}, response: ${JSON.stringify(response.data)}`,
                    'ok'
                );
            })
            .catch((error) => {
                throw new Error(error);
            })
            .finally(() => {
                this.logger(
                    `GET ${this.testAddress}, execuction end`,
                    'info'
                );
            });
    };

    this.__deleteTestRouter = async function () {
        const { setState } = this.context;
        setState({
            router: express.Router()
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
