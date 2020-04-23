import ModuleBuilder from './../module';
import express from 'express';
import middlewares from 'serverRest/middlewares';
const { usePackages, useRootpath, rootPaths } = middlewares;

const ExpressApp = function (name) {
    this.super(name);

    this.state = {
        attempts: 0
    };

    this.__setApp = function () {
        this.setState({
            app: express()
        });
        this.logger('App is set.');
    };

    this.__setRouter = function () {
        this.setState({
            router: express.Router(),
            attempts: this.state.attempts + 1
        });
        this.__setExposedValues();
        this.logger('Router is set.');
    };

    this.__useMiddlewares = function () {
        const { state } = this;
        const middlewareNames = [];
        Object.entries(usePackages).forEach(([name, pack]) => {
            state.app.use(pack);
            middlewareNames.push(name);
        });
        this.logger(
            `Middlewares used: ${middlewareNames.join(', ') || 'none'}.`
        );
    };

    this.__useRouting = function () {
        useRootpath.useApi(this);
        const { api } = rootPaths;
        this.logger(`Routing is set for ${api} path.`);
    };

    this.__setExternalMethods = function () {
        this.setExpose({
            setStaticContentPath: useRootpath.useStatic(this),
            setPublicContentPath: useRootpath.usePublic(this),
            setDocumentsContentPath: useRootpath.useDocuments(this),
            setBuildsContentPath: useRootpath.useBuilds(this),
            setRouterAgain: this.__setRouter.bind(this)
        });
    };

    this.__setExposedValues = function () {
        const { setExpose, state } = this;
        setExpose({
            app: state.app,
            router: state.router,
            attempts: state.attempts
        });
    };

    this.__createModule = function () {
        this.__setApp();
        this.__setRouter();
        this.__useMiddlewares();
        this.__useRouting();
        this.__setExternalMethods();
        this.__setExposedValues();
    };
};

ExpressApp.prototype = Object.create(ModuleBuilder.prototype);
const expressApp = new ExpressApp('[express-app]');
export default expressApp;
