import ModuleBuilder from './../module';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
import path from 'path';
import fs from 'fs';
//const ModuleBuilder = require('./../module')

const ExpressApp = function (name) {
    this.super(name)

    this.state = {
        attempts: 0
    }

    this.__setApp = function () {
        this.setState({
            app: express(),
        });
        this.logger('App is set.')
    }

    this.__setRouter = function () {
        this.setState({
            router: express.Router(),
            attempts: this.state.attempts + 1,
        });
        this.__setExposedValues();
        this.logger(`Router is set.`)
    }

    this.__useMiddlewares = function () {
        const { state } = this;
        state.app.use(bodyParser.json());
        state.app.use(cookieParser());
        state.app.use(compression());
        this.logger(`Middlewares used.`);
    };

    this.__useRouting = function () {
        const { state } = this;
        state.app.use('/', (req, res, next) => {
            state.router(req, res, next);
        });
        this.logger(`Routing is set for "/" path.`);
    };

    this.__setExposedValues = function () {
        const { setExpose, state } = this;
        setExpose({
            app: state.app,
            router: state.router,
            setRouterAgain: this.__setRouter.bind(this),
            attempts: state.attempts
        })
    };

    this.__createModule = function () {
        this.__setApp();
        this.__setRouter();
        this.__useMiddlewares();
        this.__useRouting();
        this.__setExposedValues();
    }
}

ExpressApp.prototype = Object.create(ModuleBuilder.prototype);
const expressApp = new ExpressApp('[express-app]');
export default expressApp;