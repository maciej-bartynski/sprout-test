import ModuleBuilder from './servpack.module';
import express from 'express';
import fs from 'fs';

const ExpressApp = function () {
    this.super('[SERVPACK-EXPRESS]');

    this.__setAppAndRouter = function () {
        const { setState } = this.context;
        setState({
            app: express(),
            router: express.Router()
        });
        this.logger('App is created. Router is created', 'info');
    };

    this.__useMiddlewares = function () {
        const { state, config } = this.context;
        const { customer } = config.middlewares;
        customer.forEach((middleware) => {
            state.app.use(middleware);
        });
        this.logger(`Middlewares applied to app.`, 'ok');
    };

    this.__useRouting = function () {
        const { state, setState, config } = this.context;
        const { customer } = config.serv_router;
        setState({
            routerPath: customer
        });
        state.app.use(customer, (req, res, next) => {
            this.context.state.router(req, res, next);
        });
        this.logger(`Routing is set for ${customer} path.`, 'info');
    };

    this.__useStaticFiles = function () {
        const { state, config } = this.context;
        const { customer } = config.serv_staticFiles;

        customer.forEach((pair) => {
            const [pathToFile, routeToFile] = pair;
            try {
                fs.readFileSync(pathToFile);
                state.app.get(routeToFile, (_, res) => {
                    return res.sendFile(pathToFile);
                });
                this.logger(
                    `Static file is served on "${routeToFile}" path.`,
                    'ok'
                );
            } catch (e) {
                this.logger(
                    `Something wrong static file declared to be: "${pathToFile}".`,
                    'fail'
                );
                this.logger(`${e}`, 'fail');
            }
        });
    };

    this.__useStaticFolders = function () {
        const { config, state } = this.context;
        const { customer } = config.serv_staticFolders;
        customer.forEach((pair) => {
            const [pathToFolder, routeToFolder] = pair;
            state.app.use(routeToFolder, express.static(pathToFolder));
            this.logger(
                `Public folder "${pathToFolder}" is served on "${routeToFolder}".`,
                'ok'
            );
        });
    };

    this.__useFallback = function () {
        const { config, state } = this.context;
        const { customer } = config.serv_fallback;
        const [pathToFile, fallbackRoute] = customer;
        try {
            fs.readFileSync(pathToFile);
            state.app.get(fallbackRoute, (_, res) => {
                return res.sendFile(pathToFile);
            });
            this.logger(
                `Fallback file is served on "${fallbackRoute}" path.`,
                'ok'
            );
        } catch (e) {
            this.logger(
                `Something wrong with fallback file: "${pathToFile}".`,
                'fail'
            );
            this.logger(`${e}`, 'fail');
        }
    };

    this.__createModule = function () {
        this.__setAppAndRouter();
        this.__useMiddlewares();
        this.__useRouting();
        this.__useStaticFiles();
        this.__useStaticFolders();
        this.__useFallback();
    };
};

ExpressApp.prototype = Object.create(ModuleBuilder.prototype);
const expressApp = new ExpressApp();
export default expressApp;
