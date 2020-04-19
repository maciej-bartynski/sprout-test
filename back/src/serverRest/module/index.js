import log from './../../util/logger';

function Module() {}

Module.prototype = {
    setState: function (obj) {
        Object.assign(this.state, obj);
    },
    setRequired: function (obj) {
        Object.assign(this.required, obj);
    },
    setExpose: function (obj) {
        Object.assign(this.expose, obj);
    }
};

Module.prototype.super = function (name) {
    this.__name__ = name;
    this.state = {};
    this.required = {};
    this.expose = {};
    this.setState = this.setState.bind(this);
    this.setExpose = this.setExpose.bind(this);
    this.setRequired = this.setRequired.bind(this);
};

Module.prototype.binder = function (self) {
    for (const key in self) {
        if (typeof self[key] === 'function') {
            self[key] = self[key].bind(self);
        }
    }
};

Module.prototype.__use = function (...args) {
    const { required } = this;
    args.forEach((arg) => {
        Object.keys(required).forEach((requiredField) => {
            if (typeof required[requiredField] === 'function') return;
            required[requiredField] = arg.get()[requiredField];
        });
    });
};

Module.prototype.__requiredCheck = function () {
    const { required } = this;
    Object.keys(required).forEach((requiredField) => {
        if (typeof required[requiredField] !== 'function')
            throw new Error(`Missing required module field: ${requiredField}`);
    });
};

Module.prototype.__finalLogger = function () {
    const exposedFields = [];
    Object.keys(this.get()).forEach((field) => {
        exposedFields.push(field);
    });
    const msg = `${this.__name__}. Exposed fields: ${exposedFields.join(
        ', '
    )}.`;
    log.info(msg);
};

Module.prototype.get = function () {
    const { expose } = this;

    const toReturn = {};
    for (const key in expose) {
        toReturn[key] = () => expose[key];
    }

    return toReturn;
};

Module.prototype.logger = function (info, stat = 'msg') {
    const message = `${this.__name__ || '(ANONYMOUS)'}. ${info}`;
    if (stat === 'warn') log.warn(message);
    if (stat === 'fail') log.fail(message);
    if (stat === 'ok') log.ok(message);
    if (stat === 'msg') log.info(message);
    if (stat === 'spec') log.strong(message);
};

Module.prototype.create = async function (...forUse) {
    const sectionMessage = [this.__name__, 'start'];
    log.section(...sectionMessage);
    this.__use(...forUse);
    this.__requiredCheck();
    await this.__createModule();
    this.__finalLogger();
    log.endsec(...sectionMessage);
};

export default Module;
///module.exports = Module;
