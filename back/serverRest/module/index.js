function Module() { }

Module.prototype = {
    setState: function (obj) {
        Object.assign(this.state, obj)
    },
    setRequired: function (obj) {
        Object.assign(this.required, obj)
    },
    setExpose: function (obj) {
        Object.assign(this.expose, obj)
    },
}

Module.prototype.super = function (name) {
    this.__name__ = name;
    this.state = {};
    this.required = {};
    this.expose = {};
    this.setState = this.setState.bind(this);
    this.setExpose = this.setExpose.bind(this);
    this.setRequired = this.setRequired.bind(this);
}

Module.prototype.binder = function (self) {
    for (const key in self) {
        if (typeof self[key] === 'function') {
            self[key] = self[key].bind(self)
        }
    }
}

Module.prototype.__use = function (...args) {
    const { required } = this;
    args.forEach(arg => {
        Object.keys(required).forEach(requiredField => {
            if (typeof required[requiredField] === 'function') return;
            required[requiredField] = arg.get()[requiredField];
        })
    });
};

Module.prototype.__requiredCheck = function () {
    const { required } = this;
    Object.keys(required).forEach(requiredField => {
        if (typeof required[requiredField] !== 'function')
            throw new Error(`Missing required module field: ${requiredField}`);
    })
};

Module.prototype.__finalLogger = function () {
    console.log(`${this.__name__}. Exposed fields: ${(() => {
        const fields = [];
        Object.keys(this.get()).forEach(field => {
            fields.push(field)
        })
        return fields.join(',')
    })()}`)
};

Module.prototype.get = function () {
    const { expose } = this;
    
    const toReturn = {};
    for (const key in expose) {
        toReturn[key] = () => expose[key];
    }

    return toReturn;
};

Module.prototype.logger = function (info, type = "msg") {
    const message = `${this.__name__ || '(ANONYMOUS).'}. ${info}`;
    if (type === 'msg') console.log(`${message}`);
    if (type === 'strong') console.log(`
        ${message}
`);
}

Module.prototype.create = async function (...forUse) {
    console.log(`
###### MODULE: ${this.__name__} ######`);
    try {
        this.__use(...forUse);
        this.__requiredCheck();
    } catch (e) {
        console.log(`${this.__name__}: use. ${e}`)
    }

    try {
        await this.__createModule();
    } catch (e) {
        console.log(`${this.__name__}: create. ${e}`)
    }

    this.__finalLogger();

    console.log(`###### MODULE END: ${this.__name__} ######
`);
};

module.exports = Module;