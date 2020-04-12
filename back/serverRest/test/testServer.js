const ModuleBuilder = require('./../module');
const express = require('express')

const TestServer = function (name) {
    this.super(name);

    this.__sendTestRequest = function () {
        const { state, required } = this;
        const { usePackage } = required;
        const testAddress = required.webaddress() + state.path;
        this.logger(`Server test attempt on "${testAddress}" path.`)

        let connectionTimeout = null;
        return new Promise((res) => {
            connectionTimeout = setTimeout(() => {
                this.logger(`Test at "${testAddress}" failed - connection timeout.`)
                res(false)
            }, 30000);

            try {

                const testServer = require(usePackage());
                testServer.get(testAddress, response => {
                    this.logger(`Incoming request (GET) to "${testAddress}".`);
                    let data = "";
                    response.on('data', (chunk) => {
                        data += chunk;
                    });
                    response.on("end", () => {
                        clearTimeout(connectionTimeout);
                        this.logger(`Response from "${testAddress}" received: ${data}`)
                        res(true);
                    });
                }).on("error", (e) => {
                    clearTimeout(connectionTimeout);
                    testServer.close();
                    this.logger('Connection test failure.', e);
                    res(false);
                })

            } catch (e) {
                clearTimeout(connectionTimeout);
                this.logger('Connection attemp failed.', e);
                res(false);
            }

        })
    };

    this.__setTestRouting = function () {
        const { required, setState, state } = this;
        const { router } = required;

        setState({
            path: '/test'
        })

        router().get(state.path, function (req, res) {
            res.status(200).json({
                "Message": "If you see this message, connection to server is good.",
                "Success": true
            })
        });

        this.logger(`Test router is set on path "${state.path}". Test msg will be served.`);
    };

    this.__testServer = async function() {
        const success = await this.__sendTestRequest();
        if (!success) {
            this.logger(`Test failed. Server will be closed.`);
            const { server } = this.required;
            try {
                server().close();
                this.logger(`Server closed.`);
            } catch (e) {
                this.logger(`Server closing failure: ${e}.`);
            }
        }
        this.setExpose({
            serverTestSuccess: success
        })
        this.logger(`Test success: ${this.expose.serverTestSuccess}.`)
    }

    this.__createModule = async function () {
        await this.__setTestRouting();
        await this.__testServer();
    };
}

TestServer.prototype = Object.create(ModuleBuilder.prototype);
const testServer = new TestServer('TEST SERVER');

testServer.setRequired({
    server: undefined,
    router: undefined,
    webaddress: undefined,
    usePackage: undefined,
});

module.exports = testServer
